'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronLeft, Loader2, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function AddShortPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [views, setViews] = useState('');
  const [imageId, setImageId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();
  const firestore = useFirestore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !views || !imageId) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please fill in all the required fields.',
      });
      return;
    }

    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Not Authenticated',
        description: 'You must be logged in to add a video.',
      });
      router.push('/login');
      return;
    }

    setIsLoading(true);

    const shortData = {
      title,
      views,
      imageId,
      userId: user.uid,
      createdAt: serverTimestamp(),
    };
    const shortsCollection = collection(firestore, 'shorts');
    
    addDoc(shortsCollection, shortData)
      .then(() => {
        toast({
          title: 'Short Video Added!',
          description: 'Your new short video is now available on the explore page.',
        });
        router.push('/explore');
      })
      .catch((serverError) => {
        const permissionError = new FirestorePermissionError({
          path: 'shorts',
          operation: 'create',
          requestResourceData: shortData,
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not save the short video.',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">Add New Short Video</h1>
      </header>

      <main className="flex-grow p-4 flex justify-center items-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video />
              Upload Company Short
            </CardTitle>
            <CardDescription>
              Add a new short video to be displayed to customers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Video Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Our New Summer Collection"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="views">Views Display</Label>
                <Input
                  id="views"
                  placeholder="e.g., 1.2M views"
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageId">Thumbnail Image ID</Label>
                <Input
                  id="imageId"
                  placeholder="e.g., shorts-new-product"
                  value={imageId}
                  onChange={(e) => setImageId(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Use an `id` from the `src/lib/placeholder-images.json` file.
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Add Short Video'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
