
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Send, User, Bot, Mic, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { appChat, type AppChatInput, type AppChatOutput } from '@/ai/flows/app-chatbot';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

// A simple map for language codes
const languageCodeMap: { [key: string]: string } = {
  'English': 'en-US',
  'हिंदी': 'hi-IN',
  'मराठी': 'mr-IN',
  'Bhojpuri': 'bho-IN',
  // Add other supported languages here
};


export default function ChatbotPage() {
  const router = useRouter();
  const { language, translations } = useLanguage();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [isMicAllowed, setIsMicAllowed] = useState<boolean | undefined>(undefined);

  // Check for SpeechRecognition support and permissions
  useEffect(() => {
    setIsClient(true);
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

  // Initialize SpeechRecognition
   useEffect(() => {
    if (!isClient || isMicAllowed === false) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = languageCodeMap[language] || 'en-US';

    recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                setInput(prev => prev + event.results[i][0].transcript);
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          toast({
            variant: 'destructive',
            title: 'Microphone Access Denied',
            description: 'Please enable microphone permissions in your browser settings to use voice input.',
          });
          setIsMicAllowed(false);
        }
        setIsListening(false);
    };
    
    recognition.onend = () => {
      // The onend event can fire unexpectedly, so we only update state if it was a deliberate stop.
      if (!isListening) {
        return;
      }
      
      // If still listening, restart recognition. This handles cases where it times out.
      try {
        recognition.start();
      } catch (e) {
        console.error("Recognition restart failed", e);
        setIsListening(false); // Stop if restart fails
      }
    };

    recognitionRef.current = recognition;

    // Cleanup: ensure recognition is stopped when component unmounts or listening is toggled off
    return () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    }
  }, [isClient, isMicAllowed, language, toast, isListening]);


  const toggleListening = async () => {
    if (isLoading) return;

    if (isListening) {
        setIsListening(false); // This will trigger the cleanup in the useEffect
        return;
    }

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
    
    if (recognitionRef.current) {
        try {
            recognitionRef.current.start();
            setIsListening(true);
        } catch (e) {
            console.error("Could not start recognition", e);
        }
    }
  };


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  useEffect(() => {
    setMessages([{
        text: 'Hello! I am your personal assistant. How can I help you learn about this application?',
        sender: 'bot'
    }]);
  }, []);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
    if (isListening) {
      setIsListening(false); // Stop listening when sending a message
    }

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
        const chatInput: AppChatInput = { 
            userQuery: currentInput, 
            history: messages.map(m => `${m.sender}: ${m.text}`),
            language: language
        };
        const result: AppChatOutput = await appChat(chatInput);
        const botMessage: Message = { text: result.response, sender: 'bot' };
        setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
        console.error('Chatbot error:', error);
        const errorMessage: Message = { text: 'Sorry, I encountered an error. This could be due to a missing API key or a network issue. Please try again later.', sender: 'bot' };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="flex items-center p-4 border-b border-gray-700 bg-gray-800">
        <Button
          onClick={() => router.back()}
          size="icon"
          variant="ghost"
          className="rounded-full hover:bg-gray-700"
        >
          <ChevronLeft />
        </Button>
        <div className="flex items-center gap-3 ml-4">
            <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-lg font-semibold">AI Assistant</h1>
                <p className="text-xs text-green-400">Online</p>
            </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'bot' && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
                </Avatar>
            )}
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-3 shadow ${
                msg.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-gray-700 text-white rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
             {msg.sender === 'user' && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback><User /></AvatarFallback>
                </Avatar>
             )}
          </div>
        ))}
         {isLoading && (
            <div className="flex items-end gap-3 justify-start">
                <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
                </Avatar>
                <div className="bg-gray-700 rounded-2xl px-4 py-3 shadow rounded-bl-none">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-white rounded-full animate-pulse delay-0"></span>
                        <span className="h-2 w-2 bg-white rounded-full animate-pulse delay-150"></span>
                        <span className="h-2 w-2 bg-white rounded-full animate-pulse delay-300"></span>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="relative flex items-center">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isListening ? "Listening..." : "Type your message..."}
            className="w-full bg-gray-700 border-gray-600 rounded-full pl-4 pr-24 h-12 text-white placeholder:text-gray-400 focus:ring-primary"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
             { isClient && isMicAllowed !== undefined && (
                <Button
                    size="icon"
                    variant="ghost"
                    className={cn(
                        "rounded-full w-9 h-9",
                        isListening ? "bg-red-500/80 text-white hover:bg-red-600" : "hover:bg-gray-600"
                    )}
                    onClick={toggleListening}
                    disabled={isLoading || !isMicAllowed}
                    title={isMicAllowed ? (isListening ? 'Stop listening' : 'Use microphone') : 'Microphone not available'}
                >
                    <Mic className="w-5 h-5" />
                </Button>
             )}
            <Button
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90 w-9 h-9"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
