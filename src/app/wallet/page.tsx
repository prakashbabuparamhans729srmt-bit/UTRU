
'use client';

import { ChevronLeft, Plus, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useUser, useFirestore, useDoc, useCollection } from '@/firebase';
import { useMemo } from 'react';
import { doc, collection, query, orderBy } from 'firebase/firestore';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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
        <div className="flex items-center justify-between bg-card p-4 rounded-lg border">
            <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                    {format(new Date(transaction.timestamp.seconds * 1000), 'd MMM yyyy, h:mm a')}
                </p>
            </div>
            <span className={cn(
                "font-semibold text-base",
                isCredit ? 'text-green-500' : 'text-foreground'
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

      <main className="p-4">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-orange-400 p-6 mb-6 text-white shadow-lg flex flex-col justify-between h-48">
          <div>
            <p className="text-sm opacity-80">{translations.wallet.availableBalance}</p>
            {isLoading ? (
                <Skeleton className="h-12 w-48 mt-1 bg-white/30" />
            ) : (
                <p className="text-4xl font-bold">₹{(userProfile?.walletBalance ?? 0).toLocaleString()}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button className="bg-white/20 text-white hover:bg-white/30 rounded-full" disabled>
              <Plus className="w-4 h-4 mr-2" />
              Add Money
            </Button>
          </div>
        </div>
        
        <h2 className="text-lg font-semibold mb-4">{translations.wallet.transitionHistory}</h2>

        {isLoading && (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between bg-card p-4 rounded-lg border">
                        <div>
                            <Skeleton className="h-5 w-32 mb-2" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                        <Skeleton className="h-6 w-20" />
                    </div>
                ))}
            </div>
        )}

        {!isLoading && transactions && transactions.length > 0 && (
            <div className="space-y-4">
                {transactions.map(tx => <TransactionCard key={tx.id} transaction={tx} />)}
            </div>
        )}

        {!isLoading && (!transactions || transactions.length === 0) && (
            <div className="text-center py-10 bg-card border rounded-lg">
                <p className="font-medium">No Transactions Yet</p>
                <p className="text-sm text-muted-foreground">Your wallet transactions will appear here.</p>
            </div>
        )}
      </main>
    </div>
  );
}
