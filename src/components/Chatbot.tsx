'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { X, MessageCircle, Send, Loader2 } from 'lucide-react';
import { MemoizedMarkdown } from '@/components/MemoizedMarkdown';
import { cn } from '@/lib/utils';

interface MessagePart {
  type: string;
  text?: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [hasShownNotification, setHasShownNotification] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, status, sendMessage, error } = useChat({
    onError: error => {
      console.error('Chat error:', error);
    },
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  // Debug: Log messages and status
  useEffect(() => {
    if (error) {
      console.error('Chat error:', error);
    }
  }, [status, messages, error]);

  // Add initial greeting message if messages are empty
  useEffect(() => {
    if (messages.length === 0) {
      // The initial message will be added by the API response
      // For now, we'll show it in the UI directly
    }
  }, [messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Play peaceful notification sound
  const playNotificationSound = () => {
    try {
      const audio = new Audio('/sound/chatNotification.mp3');
      audio.volume = 1; // Set volume to 50% for a peaceful sound
      audio.play().catch(error => {
        // Silently fail if audio playback is not allowed (user interaction required)
        console.debug('Audio playback not available:', error);
      });
    } catch (error) {
      // Silently fail if audio is not available
      console.debug('Audio playback not available');
    }
  };

  // Show notification popup after page load
  useEffect(() => {
    if (!hasShownNotification && !isOpen) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        setHasShownNotification(true);
        playNotificationSound();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasShownNotification, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShowNotification(false);
      scrollToBottom();
      // Focus input when chat opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const unreadCount = isOpen ? 0 : messages.length - 1; // Subtract initial greeting

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowNotification(false);
  };

  return (
    <>
      {/* Notification Popup */}
      {showNotification && !isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 md:bottom-24 z-50 animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-[280px] relative">
            <button
              onClick={() => setShowNotification(false)}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation"
              aria-label="Close notification"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-start gap-3 pr-6">
              <div className="relative flex-shrink-0">
                <Avatar className="w-10 h-10 border-2 border-gray-300">
                  <AvatarImage src="/avatar.png" alt="Ansh Grover" />
                  <AvatarFallback className="bg-gray-800 text-white text-sm font-bold">
                    AG
                  </AvatarFallback>
                </Avatar>
                {/* Online Status Indicator */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-md z-10" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Ansh is here!
                </p>
                <p className="text-xs text-gray-600 mb-3">
                  Want to chat? I'm available to answer questions about my work
                  and experience.
                </p>
                <button
                  onClick={handleOpenChat}
                  className="w-full bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Start Chat
                </button>
              </div>
            </div>
            {/* Arrow pointing to chat button */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45" />
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-4 md:right-6 z-50 group hover:scale-105 transition-transform touch-manipulation"
          aria-label="Open chat"
        >
          <div className="relative">
            <Avatar className="w-14 h-14 border-2 border-red-500 shadow-lg ring-2 ring-red-500/20">
              <AvatarImage src="/avatar.png" alt="Ansh Grover" />
              <AvatarFallback className="bg-gray-800 text-white text-lg font-bold">
                AG
              </AvatarFallback>
            </Avatar>
            {unreadCount > 0 && (
              <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-black shadow-lg">
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 md:right-6 md:bottom-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10 border-2 border-gray-300">
                  <AvatarImage src="/avatar.png" alt="Ansh Grover" />
                  <AvatarFallback className="bg-gray-800 text-white text-sm font-bold">
                    AG
                  </AvatarFallback>
                </Avatar>
                {/* Online Status Indicator */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-md z-10" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Ansh Grover
                </p>
                <p className="text-xs text-gray-500">Founder</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8 border border-gray-300 flex-shrink-0">
                  <AvatarImage src="/avatar.png" alt="Ansh" />
                  <AvatarFallback className="bg-gray-800 text-white text-xs">
                    AG
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-2">
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    Message from <strong>Ansh</strong>
                  </p>
                  <div className="text-sm leading-relaxed">
                    Hey! Chat with me to know more about me
                  </div>
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8 border border-gray-300 flex-shrink-0">
                    <AvatarImage src="/avatar.png" alt="Ansh" />
                    <AvatarFallback className="bg-gray-800 text-white text-xs">
                      AG
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'rounded-lg px-4 py-3 max-w-[80%]',
                    message.role === 'user'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                  )}
                >
                  {message.role === 'assistant' && index === 0 && (
                    <p className="text-xs font-semibold text-gray-600 mb-2">
                      Message from <strong>Ansh</strong>
                    </p>
                  )}
                  <div className="text-sm leading-relaxed prose prose-sm max-w-none">
                    {message.role === 'assistant' ? (
                      <MemoizedMarkdown
                        content={
                          (message.parts as MessagePart[] | undefined)
                            ?.filter(
                              (part: MessagePart) => part.type === 'text'
                            )
                            .map((part: MessagePart) => part.text || '')
                            .join('') || ''
                        }
                        id={message.id}
                      />
                    ) : (
                      (message.parts as MessagePart[] | undefined)
                        ?.filter((part: MessagePart) => part.type === 'text')
                        .map((part: MessagePart) => part.text || '')
                        .join('') || ''
                    )}
                  </div>
                </div>
              </div>
            ))}
            {error && (
              <div className="flex gap-3 justify-start">
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-2 text-sm max-w-[80%]">
                  Error:{' '}
                  {error.message || 'An error occurred. Please try again.'}
                </div>
              </div>
            )}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8 border border-gray-300 flex-shrink-0">
                  <AvatarImage src="/avatar.png" alt="Ansh" />
                  <AvatarFallback className="bg-gray-800 text-white text-xs">
                    AG
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex items-center gap-2">
              <div className="relative flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-white" />
                <div className="absolute -top-0.5 -right-0.5 flex gap-0.5">
                  <div className="h-1 w-1 rounded-full bg-white" />
                  <div className="h-1 w-1 rounded-full bg-white" />
                  <div className="h-1 w-1 rounded-full bg-white" />
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 flex-1"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Compose your reply"
                  className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:bg-gray-700 transition-colors placeholder:text-gray-400"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-gray-800 text-white hover:bg-gray-700 px-4 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  size="sm"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
