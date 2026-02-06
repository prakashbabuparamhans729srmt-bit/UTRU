
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
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  type ConfirmationResult,
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
  signUpWithEmail: (email: string, password: string, name: string, country: string, state: string) => Promise<boolean>;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  sendPasswordReset: (email: string) => Promise<boolean>;
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

  const setupNewUser = async (user: any, details: { name?: string; country?: string; state?: string } = {}) => {
      if (!user || !firestore) return;

      const userRef = doc(firestore, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
          try {
              const batch = writeBatch(firestore);

              const profileData: { [key: string]: any } = {
                  uid: user.uid,
                  email: user.email || null,
                  displayName: details.name || user.displayName || 'New User',
                  photoURL: user.photoURL || null,
                  phoneNumber: user.phoneNumber || null,
                  walletBalance: 100,
              };

              if (details.country) {
                  profileData.country = details.country;
              }
              if (details.state) {
                  profileData.state = details.state;
              }
              batch.set(userRef, profileData);

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
              if (auth) await auth.signOut();
              setError("Could not initialize your user profile. Please try logging in again.");
              throw firestoreError;
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
            await setupNewUser(userCredential.user, { name: userCredential.user.displayName || undefined });
            return true;
        } catch (err: any) {
            setError(err.message);
            console.error("Google sign-in error:", err);
            return false;
        } finally {
            setIsPending(false);
        }
    }, [auth, firestore]);

  // Email Sign-Up
  const handleSignUpWithEmail = useCallback(async (email: string, password: string, name: string, country: string, state: string) => {
    if (!auth || !firestore) {
        setError("Firebase not available.");
        return false;
    }
    setIsPending(true);
    setError(null);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await setupNewUser(userCredential.user, { name, country, state });
        return true;
    } catch (err: any) {
        setError(err.message);
        console.error("Email sign-up error:", err);
        return false;
    } finally {
        setIsPending(false);
    }
  }, [auth, firestore]);

  // Email Sign-In
  const handleSignInWithEmail = useCallback(async (email: string, password: string) => {
    if (!auth) {
        setError("Firebase not available.");
        return false;
    }
    setIsPending(true);
    setError(null);
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    } catch (err: any) {
        setError(err.message);
        return false;
    } finally {
        setIsPending(false);
    }
  }, [auth]);

  // Password Reset
  const handleSendPasswordReset = useCallback(async (email: string) => {
      if (!auth) {
        setError("Firebase not available.");
        return false;
      }
      setIsPending(true);
      setError(null);
      try {
          await sendPasswordResetEmail(auth, email);
          return true;
      } catch (err: any) {
          setError(err.message);
          return false;
      } finally {
          setIsPending(false);
      }
  }, [auth]);


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
        const userCredential = await confirmationResult.confirm(otp);
        await setupNewUser(userCredential.user);
        if (recaptchaVerifierRef.current) {
          recaptchaVerifierRef.current.clear();
          recaptchaVerifierRef.current = null;
        }
        setConfirmationResult(null);
        setPhoneNumber(null);
        return true;
      } catch (err: any) {
        setError(err.message);
        return false;
      } finally {
        setIsPending(false);
      }
    },
    [confirmationResult, auth, firestore]
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
      signUpWithEmail: handleSignUpWithEmail,
      signInWithEmail: handleSignInWithEmail,
      sendPasswordReset: handleSendPasswordReset,
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
      handleSignUpWithEmail,
      handleSignInWithEmail,
      handleSendPasswordReset,
      handleVerifyOtp,
      handleSignOut,
    ]
  );

  return (
    <AuthUIContext.Provider value={value}>{children}</AuthUIContext.Provider>
  );
};
