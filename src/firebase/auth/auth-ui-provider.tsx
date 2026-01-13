
'use client';

import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';

// Define the shape of the context state
interface AuthUIContextType {
  // State
  confirmationResult: ConfirmationResult | null;
  isPending: boolean;
  error: string | null;
  phoneNumber: string | null;

  // Actions
  signInWithPhoneNumber: (phoneNumber: string) => Promise<boolean>;
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
  const { user, loading: userLoading } = useUser();
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  // Phone Sign-In Initiator
  const handleSignInWithPhoneNumber = useCallback(
    async (phone: string) => {
      if (!auth) {
        setError('Firebase Auth not available');
        return false;
      }

      setIsPending(true);
      setError(null);
      setPhoneNumber(phone);

      try {
        // Initialize RecaptchaVerifier on demand
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
        });
        const result = await signInWithPhoneNumber(
          auth,
          phone,
          verifier
        );
        setConfirmationResult(result);
        return true;
      } catch (err: any) {
        setError(err.message);
        // In case of error, the verifier might need to be reset,
        // but re-creating it on the next attempt is a simple strategy.
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
        await confirmationResult.confirm(otp);
        // User is now signed in. The useUser hook will pick up the change.
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
    [confirmationResult]
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
