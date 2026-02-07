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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthUI } from '@/firebase/auth/use-auth-ui';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );


export default function EmailSignUpPage() {
  const router = useRouter();
  const { signUpWithEmail, signInWithGoogle, isPending, error } = useAuthUI();
  const { toast } = useToast();
  const { translations } = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const displayName = `${values.firstName} ${values.lastName}`.trim();
    const success = await signUpWithEmail(
      values.email,
      values.password,
      displayName
    );
    if (success) {
      toast({
        title: (translations as any).toasts.loginSuccess,
        description: (translations as any).toasts.loginSuccessDesc,
      });
      router.replace('/');
    } else {
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description:
          error || 'Could not create an account. The email may already be in use.',
      });
    }
  }

  const handleGoogleSignIn = async () => {
    const success = await signInWithGoogle();
    if (success) {
      toast({
        title: (translations as any).toasts.loginSuccess,
        description: (translations as any).toasts.loginSuccessDesc,
      });
      router.replace('/');
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Could not sign you in with Google. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col items-start justify-center p-12 bg-gradient-to-br from-teal-800 via-gray-900 to-purple-900">
        <div className="flex items-center gap-4 mb-8">
            <LayoutGrid className="h-10 w-10 text-white"/>
            <span className="text-3xl font-bold">UCLAP</span>
        </div>
        <h1 className="text-5xl font-bold mb-4">Get Started with Us</h1>
        <p className="text-lg text-gray-300 mb-12">Complete these easy steps to register your account.</p>
        <div className="space-y-4 w-full max-w-sm">
            <div className="bg-white text-black p-4 rounded-lg">
                <p className="font-bold">1. Sign up your account</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
                <p className="font-bold text-gray-400">2. Set up your workspace</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
                <p className="font-bold text-gray-400">3. Set up your profile</p>
            </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
            <p className="text-gray-400 mb-8">Enter your details below to get started.</p>
            
            <Button
                variant="outline"
                className="w-full h-12 text-base bg-gray-800 border-gray-700 hover:bg-gray-700"
                onClick={handleGoogleSignIn}
                disabled={isPending}
            >
              {isPending ? <Loader2 className="animate-spin" /> : <><GoogleIcon /> Sign up with Google</>}
            </Button>
            
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-900 px-2 text-gray-500">
                    Or
                    </span>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder="Rahul"
                                    {...field}
                                    className="bg-gray-800 border-gray-700 h-12"
                                    disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder="Kumar"
                                    {...field}
                                    className="bg-gray-800 border-gray-700 h-12"
                                    disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input
                            placeholder="m@example.com"
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
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input
                            placeholder="••••••••"
                            {...field}
                            type="password"
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
                    className="w-full h-12 text-lg mt-6 bg-teal-400 text-black hover:bg-teal-500"
                    disabled={isPending}
                    >
                    {isPending ? <Loader2 className="animate-spin" /> : 'Create Account'}
                    </Button>
                </form>
            </Form>
            <p className="mt-6 text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link href="/email-login" className="font-semibold text-teal-400 hover:underline">
                    Log In
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}
