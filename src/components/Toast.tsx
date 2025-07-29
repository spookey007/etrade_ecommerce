"use client"
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  isVisible: boolean;
  onHide: () => void;
}

export default function Toast({ message, duration = 3000, isVisible, onHide }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onHide]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
        <p className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 13l4 4L19 7"></path>
          </svg>
          {message}
        </p>
      </div>
    </div>
  );
}
