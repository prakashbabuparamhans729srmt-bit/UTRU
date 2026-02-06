
'use client';

import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  type ConfirmationResult,
  type UserCredential,
} from 'firebase/auth';
import { useAuth, useFirestore } from '@/firebase';
import { doc, getDoc, writeBatch, collection, serverTimestamp } from 'firebase/firestore';


// Define the shape of the context state
interface AuthUIContextType {
  // State
  confirmationResult: ConfirmationResult | null;
  isPending: boolean;
  error: string | null;
  phoneNumber: string | null;

  // Actions
  signInWithPhoneNumber: (phoneNumber: string, container: HTMLElement | null) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

// Create the context with a default undefined value
export const AuthUIContext = createContext<AuthUIContextType | undefined>(
  undefined
);

// Create the provider component
export const AuthUIProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const firestore = useFirestore();
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  // Effect to clean up the RecaptchaVerifier on unmount
  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  const setupNewUser = async (user: any) => {
      if (!user || !firestore) return;

      const userRef = doc(firestore, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
          try {
              const { uid, email, displayName, photoURL, phoneNumber } = user;
              
              const batch = writeBatch(firestore);

              // 1. Create the user document with a 100 balance
              batch.set(userRef, {
                  uid,
                  email: email || null,
                  displayName: displayName || 'New User',
                  photoURL: photoURL || null,
                  phoneNumber: phoneNumber || null,
                  walletBalance: 100
              });

              // 2. Create the sign-up bonus transaction
              const transactionRef = doc(collection(firestore, 'users', user.uid, 'walletTransactions'));
              batch.set(transactionRef, {
                  amount: 100,
                  type: 'credit',
                  description: 'Sign-up Bonus',
                  timestamp: serverTimestamp()
              });

              await batch.commit();
          } catch (firestoreError: any) {
              console.error("Failed to create user profile and bonus:", firestoreError);
              // If creating the user profile fails, sign them out to force a retry on next login
              if (auth) await auth.signOut();
              setError("Could not initialize your user profile. Please try logging in again.");
              throw firestoreError; // Throw error to be caught by caller
          }
      }
  };


  // Phone Sign-In Initiator
  const handleSignInWithPhoneNumber = useCallback(
    async (phone: string, container: HTMLElement | null) => {
      if (!auth || !container) {
        setError('Firebase Auth not available or container not found');
        return false;
      }

      setIsPending(true);
      setError(null);
      setPhoneNumber(phone);

      try {
        // Ensure any previous verifier is cleared before creating a new one
        if (recaptchaVerifierRef.current) {
            recaptchaVerifierRef.current.clear();
        }
        
        const verifier = new RecaptchaVerifier(auth, container, {
          'size': 'invisible',
        });
        recaptchaVerifierRef.current = verifier;

        const result = await signInWithPhoneNumber(
          auth,
          phone,
          verifier
        );
        setConfirmationResult(result);
        return true;
      } catch (err: any) {
        setError(err.message);
        // Reset verifier on error.
        if (recaptchaVerifierRef.current) {
            recaptchaVerifierRef.current.clear();
            recaptchaVerifierRef.current = null;
        }
        return false;
      } finally {
        setIsPending(false);
      }
    },
    [auth]
  );

  // Google Sign-In Initiator
  const handleSignInWithGoogle = useCallback(
    async () => {
        if (!auth) {
            setError('Firebase Auth not available');
            return false;
        }

        setIsPending(true);
        setError(null);

        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            
            // Check if it's a new user and set up their profile
            const additionalInfo = getAdditionalUserInfo(userCredential);
            if (additionalInfo?.isNewUser) {
                await setupNewUser(userCredential.user);
            }
            
            return true;
        } catch (err: any) {
            setError(err.message);
            console.error("Google sign-in error:", err);
            return false;
        } finally {
            setIsPending(false);
        }
    }, [auth, firestore]);

  // OTP Verifier
  const handleVerifyOtp = useCallback(
    async (otp: string) => {
      if (!confirmationResult) {
        setError('No confirmation result available. Please try again.');
        return false;
      }

      setIsPending(true);
      setError(null);

      try {
        const userCredential: UserCredential = await confirmationResult.confirm(otp);
        
        // This is now a new user according to Firebase Auth
        await setupNewUser(userCredential.user);

        // Clean up the reCAPTCHA verifier after successful sign-in
        if (recaptchaVerifierRef.current) {
          recaptchaVerifierRef.current.clear();
          recaptchaVerifierRef.current = null;
        }
        
        setConfirmationResult(null); // Clear confirmation result
        setPhoneNumber(null);
        return true;
      } catch (err: any) {
        setError(err.message);
        return false;
      } finally {
        setIsPending(false);
      }
    },
    [confirmationResult, firestore, auth]
  );

  // Sign Out
  const handleSignOut = useCallback(async () => {
    if (!auth) return;
    setIsPending(true);
    try {
      await auth.signOut();
       if (recaptchaVerifierRef.current) {
          recaptchaVerifierRef.current.clear();
          recaptchaVerifierRef.current = null;
        }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  }, [auth]);

  // The context value that will be supplied to consuming components
  const value = useMemo(
    () => ({
      confirmationResult,
      isPending,
      error,
      phoneNumber,
      signInWithPhoneNumber: handleSignInWithPhoneNumber,
      signInWithGoogle: handleSignInWithGoogle,
      verifyOtp: handleVerifyOtp,
      signOut: handleSignOut,
    }),
    [
      confirmationResult,
      isPending,
      error,
      phoneNumber,
      handleSignInWithPhoneNumber,
      handleSignInWithGoogle,
      handleVerifyOtp,
      handleSignOut,
    ]
  );

  return (
    <AuthUIContext.Provider value={value}>{children}</AuthUIContext.Provider>
  );
};
