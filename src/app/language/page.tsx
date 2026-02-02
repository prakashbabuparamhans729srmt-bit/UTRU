
'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguagePage() {
  const router = useRouter();
  const { language, setLanguage, translations, availableLanguages } = useLanguage();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.language.title}</h1>
      </header>
      
      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>{translations.language.chooseLanguage}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={language} onValueChange={setLanguage}>
              <div className="grid grid-cols-2 gap-4">
                {availableLanguages.map((lang) => (
                  <Label
                    key={lang}
                    htmlFor={`lang-${lang}`}
                    className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                      language === lang
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
          {translations.language.update}
        </Button>
      </footer>
    </div>
  );
}
