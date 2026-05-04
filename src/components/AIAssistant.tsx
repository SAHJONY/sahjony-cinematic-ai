'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Volume2, X, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'I am SAHJONY AI. How can I help you create Hollywood-grade content today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleListening = () => {
    setIsListening(!isListening);
    // Simulate voice input
    if (!isListening) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'user', text: 'Create a cinematic video for real estate' }]);
        setIsListening(false);
      }, 2000);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Analyzing your request with Hollywood-grade AI...',
        'Generating cinematic visuals with neural networks...',
        'Applying advanced VFX and color grading...',
        'Your Hollywood-quality video is ready!'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'ai', text: randomResponse }]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-96 h-[500px] holo-glass rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-neon-blue/20 bg-neon-blue/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Sparkles className="w-6 h-6 text-neon-blue animate-pulse" />
                    <div className="absolute inset-0 bg-neon-blue blur-lg opacity-50 animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-cinematic text-lg font-bold text-neon-blue neon-text">SAHJONY AI</h3>
                    <p className="text-xs text-gray-400">Hollywood-grade AI Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-neon-blue transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      msg.role === 'user'
                        ? 'bg-neon-blue/20 border border-neon-blue/30 text-white'
                        : 'bg-neon-purple/20 border border-neon-purple/30 text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-neon-blue/20 bg-neon-blue/5">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask SAHJONY AI..."
                  className="flex-1 bg-black/50 border border-neon-blue/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                />
                <button
                  onClick={toggleListening}
                  className={`p-2 rounded-lg transition-all ${
                    isListening
                      ? 'bg-red-500/20 border border-red-500/50 text-red-500 animate-pulse'
                      : 'bg-neon-blue/20 border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/30'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  onClick={sendMessage}
                  className="p-2 bg-neon-purple/20 border border-neon-purple/30 text-neon-purple rounded-lg hover:bg-neon-purple/30 transition-all"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full shadow-lg shadow-neon-blue/50 cinematic-btn"
      >
        <Sparkles className="w-8 h-8 text-white animate-spin-slow" />
        <div className="absolute inset-0 bg-neon-blue blur-xl opacity-50 animate-pulse"></div>
      </motion.button>
    </div>
  );
}
