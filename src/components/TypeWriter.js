'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function TypeWriter({ content, typingSpeed = 20 }) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setDisplayedContent(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, content, typingSpeed]);

  useEffect(() => {
    setDisplayedContent('');
    setCurrentIndex(0);
  }, [content]);

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
        {displayedContent}
      </ReactMarkdown>
    </div>
  );
} 