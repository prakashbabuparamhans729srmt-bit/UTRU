
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Send, User, Bot } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { appChat, type AppChatInput, type AppChatOutput } from '@/ai/flows/app-chatbot';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export default function ChatbotPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const chatInput: AppChatInput = { userQuery: input, history: messages.map(m => `${m.sender}: ${m.text}`) };
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
        <div className="relative">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="w-full bg-gray-700 border-gray-600 rounded-full pl-4 pr-12 h-12 text-white placeholder:text-gray-400 focus:ring-primary"
            disabled={isLoading}
          />
          <Button
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary hover:bg-primary/90 w-9 h-9"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}

    