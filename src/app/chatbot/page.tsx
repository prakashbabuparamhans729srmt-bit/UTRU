
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Send, User, Bot, Mic } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { appChat, type AppChatInput, type AppChatOutput } from '@/ai/flows/app-chatbot';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  const { language } = useLanguage();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [isMicAllowed, setIsMicAllowed] = useState(false);
  const isStoppingRef = useRef(false);

  useEffect(() => {
    const checkMicPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Permission granted
        setIsMicAllowed(true);
        // We can stop the track immediately as we only needed to ask for permission
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        // Permission denied
        setIsMicAllowed(false);
        console.error('Microphone access denied:', error);
        toast({
          variant: 'destructive',
          title: 'Microphone Access Denied',
          description: 'To use voice input, please allow microphone access in your browser settings.',
        });
      }
    };

    checkMicPermission();
  }, [toast]);


  useEffect(() => {
    if (!isMicAllowed) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = languageCodeMap[language] || 'en-US'; 

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setInput(prev => prev + finalTranscript);
        }
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
        if (!isStoppingRef.current && isListening) {
          // If it stops unexpectedly, restart it
           try {
            recognition.start();
          } catch(e) {
            console.error("Recognition restart failed", e);
            setIsListening(false);
          }
        } else {
           setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
    }
  }, [language, isMicAllowed, toast, isListening]);


  const toggleListening = () => {
    if (!isMicAllowed) {
       toast({
          variant: 'destructive',
          title: 'Microphone Not Available',
          description: 'Please allow microphone access to use this feature.',
        });
      return;
    }

    if (isListening) {
      isStoppingRef.current = true;
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      isStoppingRef.current = false;
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
         console.error('Could not start recognition:', error);
      }
    }
  };


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    // Initial greeting from the bot
    setMessages([{
        text: 'Hello! I am your personal assistant. How can I help you learn about this application?',
        sender: 'bot'
    }]);
  }, []);

  const handleSend = async () => {
    if (input.trim() === '') return;
    if (isListening) {
        toggleListening();
    }

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const chatInput: AppChatInput = { 
            userQuery: input, 
            history: messages.map(m => `${m.sender}: ${m.text}`),
            language: language
        };
        const result: AppChatOutput = await appChat(chatInput);
        const botMessage: Message = { text: result.response, sender: 'bot' };
        setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
        console.error('Chatbot error:', error);
        const errorMessage: Message = { text: 'Sorry, something went wrong. Please try again.', sender: 'bot' };
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

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
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
             { (window.SpeechRecognition || window.webkitSpeechRecognition) && (
                <Button
                    size="icon"
                    variant="ghost"
                    className={cn(
                        "rounded-full w-9 h-9",
                        isListening ? "bg-red-500/80 text-white hover:bg-red-600" : "hover:bg-gray-600",
                        !isMicAllowed && "cursor-not-allowed opacity-50"
                    )}
                    onClick={toggleListening}
                    disabled={isLoading || !isMicAllowed}
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
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
