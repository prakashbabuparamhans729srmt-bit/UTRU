
'use client';

import { ChevronLeft, Loader2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect, useMemo } from 'react';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

export default function EditProfilePage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const userProfileRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, loading: profileLoading } = useDoc(userProfileRef);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName || '');
      setEmail(userProfile.email || '');
      setPhotoURL(userProfile.photoURL || '');
    } else if (user) {
        // Fallback to auth user if firestore doc is not there yet
        setDisplayName(user.displayName || '');
        setEmail(user.email || '');
        setPhotoURL(user.photoURL || '');
    }
  }, [userProfile, user]);

  const handleSaveProfile = async () => {
    if (!user || !firestore || !userProfileRef) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to save your profile.' });
      return;
    }

    setIsSaving(true);
    const updatedData = {
      displayName,
      email,
      photoURL,
    };

    setDoc(userProfileRef, updatedData, { merge: true })
        .then(() => {
            toast({ title: 'Profile Updated!', description: 'Your changes have been saved.' });
            router.push('/profile');
        })
        .catch((err) => {
           const permissionError = new FirestorePermissionError({
              path: userProfileRef!.path,
              operation: 'update',
              requestResourceData: updatedData,
            });
            errorEmitter.emit('permission-error', permissionError);
            toast({
                variant: 'destructive',
                title: 'Update Failed',
                description: 'Could not save your profile. Please try again.',
            });
        })
        .finally(() => {
            setIsSaving(false);
        });
  };
  
  const isLoading = userLoading || profileLoading;

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">Edit Profile</h1>
      </header>

      <main className="flex-grow p-4 pb-24">
        {isLoading ? (
            <div className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <Skeleton className="h-5 w-40" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        ) : (
            <div className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                     <Avatar className="w-24 h-24 border-4 border-primary">
                        <AvatarImage src={photoURL || "https://picsum.photos/seed/user-profile/100/100"} alt={displayName} />
                        <AvatarFallback className='text-4xl'><User /></AvatarFallback>
                    </Avatar>
                </div>
                <div className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="bg-muted" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={email || ''} onChange={(e) => setEmail(e.target.value)} className="bg-muted" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="photoURL">Photo URL</Label>
                        <Textarea id="photoURL" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} className="bg-muted" rows={2} />
                    </div>
                </div>
            </div>
        )}
      </main>
      
      {!isLoading && (
        <footer className='fixed bottom-0 left-0 right-0 p-4 bg-background border-t'>
           <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full bg-primary text-primary-foreground rounded-full h-14 text-lg hover:bg-primary/90">
              {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Save Changes'}
            </Button>
        </footer>
      )}
    </div>
  );
}
