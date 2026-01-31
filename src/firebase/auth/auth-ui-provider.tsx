
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
  type ConfirmationResult,
  type UserCredential,
} from 'firebase/auth';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';


// Define the shape of the context state
interface AuthUIContextType {
  // State
  confirmationResult: ConfirmationResult | null;
  isPending: boolean;
  error: string | null;
  phoneNumber: string | null;

  // Actions
  signInWithPhoneNumber: (phoneNumber: string, container: HTMLElement | null) => Promise<boolean>;
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
  const { user, loading: userLoading } = useUser();
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);


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
        // Only create a new verifier if one doesn't exist or if it has expired
        if (!recaptchaVerifierRef.current) {
            recaptchaVerifierRef.current = new RecaptchaVerifier(auth, container, {
              size: 'invisible',
            });
        }
        
        const verifier = recaptchaVerifierRef.current;
        const result = await signInWithPhoneNumber(
          auth,
          phone,
          verifier
        );
        setConfirmationResult(result);
        return true;
      } catch (err: any) {
        setError(err.message);
        // Reset verifier on error. It will be recreated on next attempt.
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
        const user = userCredential.user;

        // --- NEW LOGIC: Create user document in Firestore on first login ---
        if (user && firestore) {
            const userRef = doc(firestore, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                const { uid, email, displayName, photoURL, phoneNumber } = user;
                await setDoc(userRef, {
                    uid,
                    email: email || null,
                    displayName: displayName || 'New User',
                    photoURL: photoURL || null,
                    phoneNumber: phoneNumber || null,
                    walletBalance: 0
                });
            }
        }
        // --- END NEW LOGIC ---

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
    [confirmationResult, firestore]
  );

  // Sign Out
  const handleSignOut = useCallback(async () => {
    if (!auth) return;
    setIsPending(true);
    try {
      await auth.signOut();
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
      isPending: isPending || userLoading,
      error,
      phoneNumber,
      signInWithPhoneNumber: handleSignInWithPhoneNumber,
      verifyOtp: handleVerifyOtp,
      signOut: handleSignOut,
    }),
    [
      confirmationResult,
      isPending,
      userLoading,
      error,
      phoneNumber,
      handleSignInWithPhoneNumber,
      handleVerifyOtp,
      handleSignOut,
    ]
  );

  return (
    <AuthUIContext.Provider value={value}>{children}</AuthUIContext.Provider>
  );
};
