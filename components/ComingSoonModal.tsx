'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
}

export default function ComingSoonModal({ isOpen, onClose, toolName }: ComingSoonModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setEmail('');
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass rounded-2xl p-8 max-w-md w-full border border-white/20 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-violet/20 to-neon-green/20 opacity-50 blur-xl" />
              
              <div className="relative z-10">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {!submitted ? (
                  <>
                    <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-neon-blue to-neon-violet bg-clip-text text-transparent">
                      Launching Soon
                    </h2>
                    <p className="text-white/70 mb-6">
                      <span className="font-semibold">{toolName}</span> is activating soon. Join the grid to be notified.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all text-white placeholder-white/40"
                      />
                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-violet rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        Join the Grid
                      </button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-neon-blue to-neon-violet flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white/90 text-lg">{`You're in the grid.`}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
