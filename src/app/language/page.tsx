
'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LanguagePage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    'English', 'हिंदी', 'असमिया', 'Bhojpuri', 'बंगाली', 'बोडो', 'डोगरी',
    'गुजराती', 'कन्नड़', 'कश्मीरी', 'कोंकणी', 'मैथिली', 'मलयालम',
    'मणिपुरी', 'मराठी', 'नेपाली', 'ओडिया', 'पंजाबी', 'संस्कृत',
    'संथाली', 'सिंधी', 'तमिल', 'तेलुगु'
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full">
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-semibold">Select Language</h1>
      </header>
      
      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Choose your preferred language</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <div className="grid grid-cols-2 gap-4">
                {languages.map((lang) => (
                  <Label
                    key={lang}
                    htmlFor={`lang-${lang}`}
                    className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedLanguage === lang
                        ? 'bg-primary/20 border-primary'
                        : 'border-border hover:bg-accent'
                    }`}
                  >
                    <RadioGroupItem value={lang} id={`lang-${lang}`} className="mr-3" />
                    <span>{lang}</span>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </main>

      <footer className="p-4 sticky bottom-0 bg-background/80 backdrop-blur-sm border-t">
        <Button className="w-full h-12 text-lg" onClick={() => router.back()}>
          Update Language
        </Button>
      </footer>
    </div>
  );
}
