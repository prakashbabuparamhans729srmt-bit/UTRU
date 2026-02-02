'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Cookie,
  Shield,
  Check,
  Settings,
  BarChart2,
  Megaphone,
  Users,
  ChevronRight,
  ChevronLeft,
  FileDown,
  Share2,
  Save,
  BellRing,
  X,
  Clock,
  CheckSquare,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

type CookieSettings = {
  functional: boolean;
  analytical: boolean;
  marketing: boolean;
  thirdParty: boolean;
};

const COOKIE_PREFERENCES_KEY = 'cookie_preferences';
const COOKIE_CONSENT_GIVEN_KEY = 'cookie_consent_given';

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [settings, setSettings] = useState<CookieSettings>({
    functional: true,
    analytical: true,
    marketing: false,
    thirdParty: false,
  });

  useEffect(() => {
    const consentGiven = localStorage.getItem(COOKIE_CONSENT_GIVEN_KEY);
    if (!consentGiven) {
      setIsOpen(true);
      const storedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (storedPrefs) {
        try {
          setSettings(JSON.parse(storedPrefs));
        } catch (e) {
          console.error("Could not parse cookie preferences", e);
        }
      }
    }
  }, []);
  
  const handleSaveAndClose = useCallback(() => {
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(settings));
    localStorage.setItem(COOKIE_CONSENT_GIVEN_KEY, 'true');
    setIsOpen(false);
  }, [settings]);

  useEffect(() => {
    if (isOpen && timer > 0) {
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (isOpen && timer === 0) {
        // Auto-save on timeout
        handleSaveAndClose();
    }
  }, [isOpen, timer, handleSaveAndClose]);

  const handleAcceptAll = () => {
    const newSettings = {
      functional: true,
      analytical: true,
      marketing: true,
      thirdParty: true,
    };
    setSettings(newSettings);
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newSettings));
    localStorage.setItem(COOKIE_CONSENT_GIVEN_KEY, 'true');
    setIsOpen(false);
  };
  
  const handleRejectAll = () => {
    const newSettings = {
      functional: false,
      analytical: false,
      marketing: false,
      thirdParty: false,
    };
    setSettings(newSettings);
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newSettings));
    localStorage.setItem(COOKIE_CONSENT_GIVEN_KEY, 'true');
    setIsOpen(false);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const PageIndicator = () => (
      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="text-xs text-muted-foreground">पृष्ठ {step > 2 ? step -1 : step}/3</span>
        <Progress value={(step > 2 ? step -1 : step) * 33.33} className="w-24 h-1"/>
      </div>
  );

  const renderStep1 = () => (
    <>
      <DialogHeader className="text-center items-center">
        <div className="bg-primary/10 rounded-full p-3 mb-2">
            <Cookie className="h-8 w-8 text-primary" />
        </div>
        <DialogTitle className="text-2xl">आपकी गोपनीयता, हमारी प्रतिबद्धता</DialogTitle>
        <DialogDescription>
        हम आपकी गोपनीयता का सम्मान करते हैं। कृपया नीचे दिए गए विकल्पों में से अपनी पसंद चुनें या विस्तृत सेटिंग्स के लिए "विस्तृत प्रबंधन" बटन पर क्लिक करें।
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <Button variant="default" size="lg" className="h-auto py-3 justify-start" onClick={handleAcceptAll}>
          <div className="flex items-center gap-4">
            <CheckSquare className="h-6 w-6"/>
            <div className="text-left">
              <p className="font-bold">सभी स्वीकारें</p>
              <p className="text-xs font-normal">सभी कुकीज़ स्वीकार करें।</p>
            </div>
          </div>
        </Button>
        <Button variant="secondary" size="lg" className="h-auto py-3 justify-start" onClick={handleRejectAll}>
          <div className="flex items-center gap-4">
            <Shield className="h-6 w-6"/>
            <div className="text-left">
              <p className="font-bold">केवल आवश्यक</p>
              <p className="text-xs font-normal">केवल आवश्यक कुकीज़ स्वीकार करें।</p>
            </div>
          </div>
        </Button>
        <Button variant="outline" size="lg" className="h-auto py-3 justify-start" onClick={() => setStep(2)}>
           <div className="flex items-center gap-4">
            <Settings className="h-6 w-6"/>
            <div className="text-left">
              <p className="font-bold">विस्तृत प्रबंधन</p>
              <p className="text-xs font-normal">व्यक्तिगत चयन कॉन्फ़िगर करें।</p>
            </div>
          </div>
        </Button>
      </div>

      <DialogFooter className="sm:justify-between flex-col sm:flex-col sm:space-x-0 gap-4">
        <div className="text-center text-sm text-muted-foreground border rounded-lg p-2">
          <Clock className="inline-block h-4 w-4 mr-2"/>
          सत्र सीमा: {formatTime(timer)} बचा है
        </div>
        <div className="flex justify-around gap-2">
            <Button variant="ghost" size="icon" disabled><FileDown/></Button>
            <Button variant="ghost" size="icon" disabled><Share2/></Button>
            <Button variant="ghost" size="icon" onClick={handleSaveAndClose}><Save/></Button>
            <Button variant="ghost" size="icon" disabled><BellRing/></Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X/></Button>
        </div>
        <PageIndicator/>
      </DialogFooter>
    </>
  );

  const renderStep2 = () => (
    <>
      <DialogHeader>
        <DialogTitle>⚙️ विस्तृत कुकीज़ प्रबंधन</DialogTitle>
        <DialogDescription>
        प्रत्येक कुकीज़ श्रेणी को व्यक्तिगत रूप से प्रबंधित करें।
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4 max-h-[50vh] overflow-y-auto px-1">
        
        {/* Mandatory Cookies */}
        <div className="rounded-lg border p-4 bg-muted/50">
          <div className="flex justify-between items-center">
            <Label htmlFor="mandatory-cookies" className="font-bold text-base flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary"/> अनिवार्य कुकीज़
            </Label>
            <Switch checked disabled/>
          </div>
          <p className="text-sm text-muted-foreground mt-2">सुरक्षा, लॉगिन, शॉपिंग कार्ट। हमेशा सक्षम, अक्षम नहीं किया जा सकता।</p>
        </div>

        {/* Functional Cookies */}
        <div className="rounded-lg border p-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="functional-cookies" className="font-bold text-base flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500"/> कार्यात्मक कुकीज़
            </Label>
            <Switch id="functional-cookies" checked={settings.functional} onCheckedChange={(c) => setSettings(s => ({...s, functional: c}))}/>
          </div>
          <p className="text-sm text-muted-foreground mt-2">भाषा, क्षेत्र, थीम सेटिंग्स, और पसंदीदा याद रखने में मदद करता है।</p>
        </div>
        
        {/* Analytical Cookies */}
        <div className="rounded-lg border p-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="analytical-cookies" className="font-bold text-base flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-yellow-500"/> विश्लेषणात्मक कुकीज़
            </Label>
            <Switch id="analytical-cookies" checked={settings.analytical} onCheckedChange={(c) => setSettings(s => ({...s, analytical: c}))}/>
          </div>
          <p className="text-sm text-muted-foreground mt-2">उपयोगकर्ता व्यवहार का विश्लेषण करके हमें अनुभव को बेहतर बनाने में मदद करता है।</p>
        </div>

        {/* Marketing Cookies */}
        <div className="rounded-lg border p-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="marketing-cookies" className="font-bold text-base flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-red-500"/> विपणन कुकीज़
            </Label>
            <Switch id="marketing-cookies" checked={settings.marketing} onCheckedChange={(c) => setSettings(s => ({...s, marketing: c}))}/>
          </div>
          <p className="text-sm text-muted-foreground mt-2">रुचि-आधारित और लक्षित विज्ञापन दिखाने में मदद करता है।</p>
        </div>

        {/* Third-party Cookies */}
         <div className="rounded-lg border p-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="third-party-cookies" className="font-bold text-base flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-500"/> तृतीय-पक्ष कुकीज़
            </Label>
            <Switch id="third-party-cookies" checked={settings.thirdParty} onCheckedChange={(c) => setSettings(s => ({...s, thirdParty: c}))}/>
          </div>
          <p className="text-sm text-muted-foreground mt-2">यूट्यूब एम्बेड और ट्विटर शेयर जैसी एकीकृत सेवाओं को सक्षम करता है।</p>
        </div>

      </div>
      <DialogFooter className="flex-col gap-4">
        <div className="flex justify-between w-full">
            <Button variant="outline" onClick={() => setStep(1)}><ChevronLeft className="mr-2"/> पीछे</Button>
            <Button onClick={() => setStep(4)}>आगे <ChevronRight className="ml-2"/></Button>
        </div>
        <PageIndicator />
      </DialogFooter>
    </>
  );

    const renderStep4Summary = () => (
    <>
      <DialogHeader>
        <DialogTitle>📋 सारांश और पुष्टिकरण</DialogTitle>
        <DialogDescription>
            आपकी चुनी हुई सेटिंग्स की समीक्षा करें।
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="rounded-lg border p-4 space-y-2 text-sm">
            <h3 className="font-bold mb-2">चयन सारांश</h3>
            <Separator/>
            <p className="flex justify-between items-center pt-2"><span>🔵 अनिवार्य:</span> <span className="font-semibold text-green-600">सक्रिय</span></p>
            <p className="flex justify-between items-center"><span>🟢 कार्यात्मक:</span> <span className={settings.functional ? "font-semibold text-green-600" : "font-semibold text-red-600"}>{settings.functional ? 'सक्रिय' : 'निष्क्रिय'}</span></p>
            <p className="flex justify-between items-center"><span>🟡 विश्लेषणात्मक:</span> <span className={settings.analytical ? "font-semibold text-green-600" : "font-semibold text-red-600"}>{settings.analytical ? 'सक्रिय' : 'निष्क्रिय'}</span></p>
            <p className="flex justify-between items-center"><span>🔴 विपणन:</span> <span className={settings.marketing ? "font-semibold text-green-600" : "font-semibold text-red-600"}>{settings.marketing ? 'सक्रिय' : 'निष्क्रिय'}</span></p>
            <p className="flex justify-between items-center"><span>⚫ तृतीय-पक्ष:</span> <span className={settings.thirdParty ? "font-semibold text-green-600" : "font-semibold text-red-600"}>{settings.thirdParty ? 'सक्रिय' : 'निष्क्रिय'}</span></p>
        </div>
        <div className="flex items-start space-x-3 mt-4">
            <Checkbox id="terms" required className="mt-1" />
            <div className="grid gap-1.5 leading-none">
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                मैंने <a href="/privacy-policy" target="_blank" className="underline text-primary">गोपनीयता नीति</a> और <a href="/privacy-policy" target="_blank" className="underline text-primary">कुकीज़ नीति</a> पढ़ी और स्वीकार की।
                </label>
            </div>
        </div>
      </div>
      <DialogFooter className="flex-col gap-4">
        <Button size="lg" className="w-full" onClick={handleSaveAndClose}>मेरी वरीयताएँ सहेजें और लागू करें</Button>
        <div className="flex justify-between w-full">
            <Button variant="outline" onClick={() => setStep(2)}><ChevronLeft className="mr-2"/> पीछे</Button>
        </div>
        <PageIndicator />
      </DialogFooter>
    </>
  );


  const renderContent = () => {
    switch(step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 4: return renderStep4Summary(); // Skipped step 3 for simplicity
      default: return renderStep1();
    }
  }

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md w-full p-6">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
