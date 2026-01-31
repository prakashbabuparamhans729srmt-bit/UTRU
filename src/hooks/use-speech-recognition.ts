
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

// A simple map for language codes
const languageCodeMap: { [key: string]: string } = {
  'English': 'en-US',
  'हिंदी': 'hi-IN',
  'मराठी': 'mr-IN',
  'Bhojpuri': 'bho-IN',
  // Add other supported languages here
};


export const useSpeechRecognition = (onResult: (transcript: string) => void) => {
    const { language } = useLanguage();
    const { toast } = useToast();
    const [isListening, setIsListening] = useState(false);
    const [isMicAllowed, setIsMicAllowed] = useState<boolean | undefined>(undefined);
    const recognitionRef = useRef<any>(null);

    // Check for support and permission on mount
    useEffect(() => {
        const checkSupportAndPermission = async () => {
            if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
                console.warn('Speech recognition not supported by this browser.');
                setIsMicAllowed(false);
                return;
            }

            try {
                const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
                setIsMicAllowed(permissionStatus.state !== 'denied');
                permissionStatus.onchange = () => {
                    setIsMicAllowed(permissionStatus.state !== 'denied');
                }
            } catch (error) {
                console.error('Error checking microphone permission:', error);
                setIsMicAllowed(false);
            }
        };
        checkSupportAndPermission();
    }, []);

    // Initialize or re-initialize recognition when language or permissions change
    useEffect(() => {
        if (isMicAllowed === false) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = false; // We want a single result for search
        recognition.interimResults = false; // No need for interim results
        recognition.lang = languageCodeMap[language] || 'en-US';
        
        recognitionRef.current = recognition;
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'not-allowed') {
                toast({
                    variant: 'destructive',
                    title: 'Microphone Access Denied',
                    description: 'Please enable microphone permissions in your browser settings.',
                });
                setIsMicAllowed(false);
            }
            setIsListening(false);
        };
        
        recognition.onend = () => {
            setIsListening(false);
        };
        
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };

    }, [isMicAllowed, language, onResult, toast]);

    const startListening = useCallback(async () => {
        if (isListening || !recognitionRef.current) return;

        if (isMicAllowed === false) {
            toast({
                variant: 'destructive',
                title: 'Microphone Not Available',
                description: 'Please grant microphone access in your browser settings.',
            });
            return;
        }

        // Request permission if not yet determined
        if (isMicAllowed === undefined) {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                setIsMicAllowed(true);
            } catch (error) {
                console.error('Microphone access denied:', error);
                setIsMicAllowed(false);
                toast({
                    variant: 'destructive',
                    title: 'Microphone Access Denied',
                    description: 'To use voice input, please allow microphone access.',
                });
                return;
            }
        }
        
        try {
            recognitionRef.current.start();
            setIsListening(true);
        } catch (e) {
            console.error("Could not start recognition", e);
            setIsListening(false);
        }

    }, [isListening, isMicAllowed, toast]);

    const stopListening = useCallback(() => {
        if (!isListening || !recognitionRef.current) return;
        recognitionRef.current.stop();
        setIsListening(false);
    }, [isListening]);

    return {
        isListening,
        isMicAvailable: isMicAllowed !== false,
        startListening,
        stopListening,
    };
};
