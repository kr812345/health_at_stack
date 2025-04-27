'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import { FaHeartbeat } from 'react-icons/fa';
import TypeWriter from '@/components/TypeWriter';
import ReactMarkdown from 'react-markdown';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setError(null);

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to get response');
      }

      if (!data.text) {
        throw new Error('Received empty response from API');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setError(error.message);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${error.message}. Please try again.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (content, role) => {
    if (role === 'assistant') {
      return (
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 text-sm">{children}</p>,
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 text-sm">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 text-sm">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-sm font-bold mb-2">{children}</h3>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-gray-300 pl-2 italic text-sm mb-2">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
    }
    return <div className="text-sm">{content}</div>;
  };

  return (
    <main className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-green-50 to-blue-50">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="bg-green-600 text-white p-4 flex items-center gap-2">
          <FaHeartbeat size={24} />
          <h1 className="text-xl font-semibold">AI Health Coach</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!messages.length && (
            <div className="text-center text-gray-600">
              <FaHeartbeat size={48} className="mx-auto mb-4 text-green-500" />
              <h2 className="text-xl font-semibold mb-2">Welcome to your AI Health Coach! 👋</h2>
              <p className="mb-4 text-sm">I&apos;m here to help you with questions about:</p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-left text-sm">
                <ul className="space-y-2">
                  <li>🥗 Nutrition & Diet</li>
                  <li>💪 Fitness & Exercise</li>
                  <li>🧘‍♂️ Mental Wellness</li>
                </ul>
                <ul className="space-y-2">
                  <li>❤️ General Health</li>
                  <li>😴 Sleep & Recovery</li>
                  <li>✨ Healthy Habits</li>
                </ul>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                ⚕️ Note: I provide general health information only. Always consult healthcare professionals for medical advice.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                🤖 Remember: My responses are AI-generated and may not always be accurate. Please verify important information from reliable sources.
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-lg p-4 ${
                  message.role === 'user' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}
              >
                {message.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none">
                    <TypeWriter content={message.content} typingSpeed={20} />
                  </div>
                ) : (
                  renderMessage(message.content, 'user')
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 rounded-lg p-4 border border-gray-200 flex items-center gap-2 text-sm">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
                <span>Analyzing your health question...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t border-gray-200 bg-white p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about health, nutrition, fitness, or wellness..."
              className="flex-1 p-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <FiSend size={20} />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
} 