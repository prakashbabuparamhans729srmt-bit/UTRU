
'use client';

import { useContext } from 'react';
import { AuthUIContext } from './auth-ui-provider';

/**
 * A custom hook to access the phone authentication UI state and actions.
 * This hook must be used within a component that is a descendant of `AuthUIProvider`.
 *
 * @returns The authentication UI context, including state (isPending, error, etc.)
 * and actions (signInWithPhoneNumber, verifyOtp, signOut).
 *
 * @example
 * ```tsx
 * // In a phone number input component
 * const { signInWithPhoneNumber, isPending } = useAuthUI();
 *
 * const handleSendOtp = async () => {
 *   const success = await signInWithPhoneNumber('+16505551234');
 *   if (success) {
 *     // Navigate to OTP verification screen
 *   }
 * };
 *
 * // In an OTP verification component
 * const { verifyOtp, isPending, error } = useAuthUI();
 *
 * const handleVerify = async () => {
 *   const success = await verifyOtp('123456');
 *   if (success) {
 *     // Navigate to user profile or home screen
 *   } else {
 *     // Display the error message
 *   }
 * };
 * ```
 */
export const useAuthUI = () => {
  const context = useContext(AuthUIContext);
  if (context === undefined) {
    throw new Error('useAuthUI must be used within an AuthUIProvider');
  }
  return context;
};
