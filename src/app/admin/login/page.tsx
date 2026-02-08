
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, LogIn, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mx-auto mb-4">
             <span className="text-4xl font-bold">🇮🇳</span>
          </div>
          <CardTitle className="text-2xl font-bold">भारत सूचना - एडमिन लॉगिन</CardTitle>
          <CardDescription>एडमिन पोर्टल में आपका स्वागत है</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); router.push('/admin'); }}>
            <div className="space-y-2">
              <Label htmlFor="username">उपयोगकर्ता नाम / ईमेल</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="username" type="text" placeholder="admin@example.com" className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">पासवर्ड</Label>
               <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="text-sm font-normal">मुझे याद रखें</Label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline">रीसेट?</a>
            </div>
            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              लॉगिन
            </Button>
          </form>
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>📞 समर्थन: admin-support@bharatsuchana.in</p>
            <p>🔒 सुरक्षित कनेक्शन</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
