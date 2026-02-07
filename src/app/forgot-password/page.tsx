'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, LayoutGrid } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthUI } from '@/firebase/auth/use-auth-ui';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { sendPasswordReset, isPending } = useAuthUI();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const success = await sendPasswordReset(values.email);
    if (success) {
      toast({
        title: 'Password Reset Email Sent',
        description: `If an account exists for ${values.email}, a password reset link has been sent.`,
      });
      router.push('/email-login');
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not send password reset email. Please try again.',
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white grid lg:grid-cols-2">
       <div className="hidden lg:flex flex-col items-start justify-center p-12 bg-gradient-to-br from-teal-800 via-gray-900 to-purple-900">
        <div className="flex items-center gap-4 mb-8">
            <LayoutGrid className="h-10 w-10 text-white"/>
            <span className="text-3xl font-bold">UCLAP</span>
        </div>
        <h1 className="text-5xl font-bold mb-4">Forgot Your Password?</h1>
        <p className="text-lg text-gray-300 mb-12">No worries, we'll help you get back in.</p>
         <div className="space-y-4 w-full max-w-sm">
             <div className="bg-white/10 p-4 rounded-lg">
                <p className="font-bold text-gray-400">1. Enter your email</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-black">
                <p className="font-bold">2. Check your inbox for a reset link</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
                <p className="font-bold text-gray-400">3. Create a new password</p>
            </div>
        </div>
      </div>
       <div className="flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-2">Reset Password</h2>
            <p className="text-gray-400 mb-8">
            Enter your email and we'll send a link to reset your password.
            </p>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="you@example.com"
                        {...field}
                        type="email"
                        className="bg-gray-800 border-gray-700 h-12"
                        disabled={isPending}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <Button
                type="submit"
                className="w-full h-12 text-lg bg-teal-400 text-black hover:bg-teal-500"
                disabled={isPending}
                >
                {isPending ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    'Send Reset Link'
                )}
                </Button>
            </form>
            </Form>
             <p className="mt-6 text-center text-sm text-gray-400">
                Remembered your password?{' '}
                <Link href="/email-login" className="font-semibold text-teal-400 hover:underline">
                    Log In
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}
