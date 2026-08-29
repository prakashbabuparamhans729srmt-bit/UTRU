'use client';

import { ChevronLeft, Plus, Loader2, CreditCard, Banknote, Landmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useUser, useFirestore, useDoc, useCollection } from '@/firebase';
import { useMemo, useState } from 'react';
import { doc, collection, query, orderBy, serverTimestamp, increment, writeBatch } from 'firebase/firestore';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface UserProfile {
    walletBalance?: number;
}

interface WalletTransaction {
    id: string;
    amount: number;
    type: 'credit' | 'debit';
    description: string;
    timestamp: { seconds: number, nanoseconds: number };
}

function TransactionCard({ transaction }: { transaction: WalletTransaction }) {
    const isCredit = transaction.type === 'credit';
    return (
        <div className="flex items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
            <div>
                <p className="font-semibold text-sm">{transaction.description}</p>
                <p className="text-[10px] text-muted-foreground">
                    {transaction.timestamp ? format(new Date(transaction.timestamp.seconds * 1000), 'd MMM yyyy, h:mm a') : 'Just now'}
                </p>
            </div>
            <span className={cn(
                "font-bold text-sm",
                isCredit ? 'text-green-500' : 'text-red-500'
            )}>
                {isCredit ? '+ ' : '- '}₹{Math.abs(transaction.amount).toLocaleString()}
            </span>
        </div>
    );
}

export default function WalletPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [addAmount, setAddAmount] = useState('500');
  const [isAdding, setIsAdding] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userProfileRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const transactionsQuery = useMemo(() => {
    if (!user || !firestore) return null;
    return query(
        collection(firestore, 'users', user.uid, 'walletTransactions'),
        orderBy('timestamp', 'desc')
    );
  }, [user, firestore]);

  const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(userProfileRef);
  const { data: transactions, loading: transactionsLoading } = useCollection<WalletTransaction>(transactionsQuery);

  const handleAddMoney = () => {
    const amount = parseFloat(addAmount);
    if (isNaN(amount) || amount <= 0) {
        toast({ variant: 'destructive', title: 'Invalid Amount', description: 'Please enter a valid amount to add.' });
        return;
    }

    if (!user || !firestore || !userProfileRef) return;

    setIsAdding(true);

    const transactionData = {
        amount: amount,
        type: 'credit',
        description: 'Wallet Top-up',
        timestamp: serverTimestamp(),
    };

    const batch = writeBatch(firestore);
    
    const newTxRef = doc(collection(firestore, 'users', user.uid, 'walletTransactions'));
    batch.set(newTxRef, transactionData);

    batch.update(userProfileRef, {
        walletBalance: increment(amount)
    });

    batch.commit()
        .then(() => {
            toast({
                title: 'Money Added Successfully!',
                description: `₹${amount} has been added to your wallet.`,
            });
            setIsDialogOpen(false);
            setAddAmount('500');
        })
        .catch((serverError: any) => {
            const permissionError = new FirestorePermissionError({
                path: userProfileRef.path,
                operation: 'update',
                requestResourceData: { walletBalance: increment(amount) },
            });
            errorEmitter.emit('permission-error', permissionError);
            toast({
                variant: 'destructive',
                title: 'Recharge Failed',
                description: 'Could not update wallet balance. Please try again.',
            });
        })
        .finally(() => {
            setIsAdding(false);
        });
  };

  const isLoading = userLoading || profileLoading || transactionsLoading;

  if (!userLoading && !user) {
    return (
        <div className="bg-background text-foreground min-h-screen flex flex-col">
            <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
                <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
                    <ChevronLeft />
                </Button>
                <h1 className="text-lg font-semibold">{translations.wallet.title}</h1>
            </header>
            <main className="flex-grow flex flex-col justify-center items-center text-center p-6">
                <h2 className="text-xl font-bold mb-2">Please Log In</h2>
                <p className="text-muted-foreground mb-4">You need to be logged in to view your wallet.</p>
                <Link href="/phone-login">
                    <Button>Login</Button>
                </Link>
            </main>
        </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
        <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
            <ChevronLeft />
          </Button>
          <h1 className="text-lg font-semibold">{translations.wallet.title}</h1>
        </header>

      <main className="p-4 space-y-6">
        <div className="rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-orange-400 p-6 text-white shadow-xl flex flex-col justify-between h-52 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Landmark size={120} />
          </div>
          <div>
            <p className="text-sm font-medium opacity-90 mb-1">{translations.wallet.availableBalance}</p>
            {isLoading ? (
                <Skeleton className="h-12 w-48 mt-1 bg-white/20" />
            ) : (
                <p className="text-5xl font-extrabold tracking-tight">₹{(userProfile?.walletBalance ?? 0).toLocaleString()}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-white text-primary hover:bg-white/90 rounded-full font-bold px-6 shadow-lg">
                        <Plus className="w-5 h-5 mr-2" />
                        Add Money
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Recharge Wallet</DialogTitle>
                        <DialogDescription>
                            Enter the amount you want to add to your UCLAP wallet.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Amount (₹)</label>
                            <Input 
                                type="number" 
                                value={addAmount} 
                                onChange={(e) => setAddAmount(e.target.value)}
                                className="text-2xl font-bold h-14"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {['200', '500', '1000', '2000'].map(amt => (
                                <Button 
                                    key={amt} 
                                    variant="outline" 
                                    size="sm" 
                                    className="rounded-full"
                                    onClick={() => setAddAmount(amt)}
                                >
                                    +₹{amt}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            className="w-full h-12 text-lg font-bold" 
                            onClick={handleAddMoney} 
                            disabled={isAdding}
                        >
                            {isAdding ? <Loader2 className="animate-spin mr-2"/> : 'Pay & Add Money'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <Banknote className="text-primary"/>
                {translations.wallet.transitionHistory}
            </h2>

            {isLoading && (
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between bg-card p-4 rounded-lg border">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                            <Skeleton className="h-6 w-16" />
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && transactions && transactions.length > 0 && (
                <div className="grid gap-3 pb-20">
                    {transactions.map(tx => <TransactionCard key={tx.id} transaction={tx} />)}
                </div>
            )}

            {!isLoading && (!transactions || transactions.length === 0) && (
                <div className="text-center py-20 bg-muted/20 border-2 border-dashed rounded-3xl">
                    <Banknote className="mx-auto w-12 h-12 text-muted-foreground opacity-20 mb-4" />
                    <p className="font-bold text-muted-foreground">No Transactions Yet</p>
                    <p className="text-xs text-muted-foreground px-10 mt-1">Your wallet activity will be listed here after your first transaction.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
