
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Send, User, Bot, Mic, Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { appChat, type AppChatInput, type AppChatOutput } from '@/ai/flows/app-chatbot';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/context/LanguageContext';
import { useVoiceSearch } from '@/context/VoiceSearchContext';
import { useToast } from '@/hooks/use-toast';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export default function ChatbotPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const CHAT_HISTORY_KEY = 'chatbot_history';
  const { openModal: openVoiceModal } = useVoiceSearch();
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Load chat history from localStorage on mount
  useEffect(() => {
    if (isClient) {
        try {
            const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
            if (savedHistory) {
                setMessages(JSON.parse(savedHistory));
            } else {
                setMessages([{
                    text: 'Hello! I am your personal assistant. How can I help you learn about this application?',
                    sender: 'bot'
                }]);
            }
        } catch (error) {
            console.error("Failed to load chat history:", error);
            setMessages([{
                text: 'Hello! I am your personal assistant. How can I help you learn about this application?',
                sender: 'bot'
            }]);
        }
    }
  }, [isClient]);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (isClient && messages.length > 0) {
        try {
            localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
        } catch (error) {
            console.error("Failed to save chat history:", error);
        }
    }
  }, [messages, isClient]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

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

  const handleClearChat = () => {
    try {
        localStorage.removeItem(CHAT_HISTORY_KEY);
        setMessages([{
            text: 'Hello! I am your personal assistant. How can I help you learn about this application?',
            sender: 'bot'
        }]);
        toast({
            title: 'Chat Cleared',
            description: 'Your conversation history has been cleared.',
        });
    } catch (error) {
        console.error("Failed to clear chat history:", error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not clear chat history.',
        });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
        <div className='flex items-center'>
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
        </div>
        <Button
            onClick={handleClearChat}
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-gray-700"
            title="Clear Chat"
        >
            <Trash2 className="w-5 h-5"/>
        </Button>
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
            placeholder="Type your message..."
            className="w-full bg-gray-700 border-gray-600 rounded-full pl-4 pr-24 h-12 text-white placeholder:text-gray-400 focus:ring-primary"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button
                size="icon"
                variant="ghost"
                className="rounded-full w-9 h-9 hover:bg-gray-600"
                onClick={openVoiceModal}
                disabled={isLoading}
                title="Use microphone"
            >
                <Mic className="w-5 h-5" />
            </Button>
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
