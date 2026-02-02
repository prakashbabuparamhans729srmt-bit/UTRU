'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const languageCodeMap: { [key: string]: string } = {
  'English': 'en-US',
  'हिंदी': 'hi-IN',
  'असमिया': 'as-IN',
  'Bhojpuri': 'bho-IN',
  'बंगाली': 'bn-IN',
  'बोडो': 'brx-IN',
  'डोगरी': 'doi-IN',
  'गुजराती': 'gu-IN',
  'कन्नड़': 'kn-IN',
  'कश्मीरी': 'ks-IN',
  'कोंकणी': 'kok-IN',
  'मैथिली': 'mai-IN',
  'मलयालम': 'ml-IN',
  'मणिपुरी': 'mni-IN',
  'मराठी': 'mr-IN',
  'नेपाली': 'ne-NP',
  'ओडिया': 'or-IN',
  'पंजाबी': 'pa-IN',
  'संस्कृत': 'sa-IN',
  'संथाली': 'sat-IN',
  'सिंधी': 'sd-IN',
  'தமிழ்': 'ta-IN',
  'తెలుగు': 'te-IN'
};

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceSearchModal({ isOpen, onClose }: VoiceSearchModalProps) {
  const router = useRouter();
  const { language, translations } = useLanguage();
  const { toast } = useToast();
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
    onClose();
  }, [router, onClose]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopListening();
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported by this browser.');
      onClose();
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = languageCodeMap[language] || 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onend = () => {
      setIsListening(false);
      // If a search timeout is not pending, it means we stopped manually or it ended naturally without a final result.
      // Perform search with whatever transcript we have.
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      if (transcript.trim()) {
        handleSearch(transcript);
      } else {
        onClose();
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed') {
          toast({
              variant: 'destructive',
              title: translations.toasts.micAccessDenied,
              description: translations.toasts.micAccessDeniedDesc,
          });
      } else {
        console.error('Speech recognition error:', event.error);
      }
      setIsListening(false);
      onClose();
    };

    recognition.onresult = (event: any) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      let fullTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        fullTranscript += event.results[i][0].transcript;
      }

      setTranscript(fullTranscript);

      // Set a timeout to trigger search if user stops talking
      searchTimeoutRef.current = setTimeout(() => {
        stopListening();
      }, 3000);
    };

    try {
        recognition.start();
    } catch(e) {
        console.error("Could not start recognition:", e);
        onClose();
    }

    return () => {
      stopListening();
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
    
  }, [isOpen, stopListening, language, handleSearch, transcript, toast, translations, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex flex-col items-center justify-center p-4" onClick={onClose}>
      <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
         <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute -top-16 right-0 sm:-right-16 text-white hover:bg-white/10 rounded-full"
          >
            <X className="w-8 h-8" />
        </Button>
        <div
            className={cn(
                "relative w-40 h-40 bg-black border-4 border-white rounded-full flex items-center justify-center"
            )}
            >
            <Mic className="w-20 h-20 text-white" />
            {isListening && (
                <div className="absolute w-full h-full rounded-full border-2 border-white animate-ping"></div>
            )}
        </div>
        <p className="text-white text-2xl font-medium mt-8 text-center min-h-[3rem] max-w-lg">
            {transcript || (isListening ? "Listening..." : "Starting...")}
        </p>
      </div>
    </div>
  );
}
