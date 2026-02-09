"use client";

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  "", 
  "please",
  "pleaseee",
  "sure najud?",
  "wehhhh",
  "di na mahangyo?",
  "di najud?",
  "tarong ba?",
];

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleYes = () => {
    setYesPressed(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff69b4', '#ffffff']
    });
  };

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    const padding = 80;
    const randomX = Math.random() * (window.innerWidth - padding * 2) + padding;
    const randomY = Math.random() * (window.innerHeight - padding * 2) + padding;
    setNoButtonPos({ x: randomX, y: randomY });
    setIsMoved(true);
  };

  const getYesStyles = () => {
    const isLastStage = noCount >= phrases.length - 1;
    const isFinalPlea = noCount >= phrases.length;

    if (isLastStage || isFinalPlea) {
      return {
        fontSize: 'clamp(40px, 15vw, 100px)',
        padding: 'clamp(20px, 8vh, 60px) clamp(40px, 15vw, 100px)',
        width: '90vw',
        height: 'auto'
      };
    }

    const size = noCount * 12 + 18;
    return {
      fontSize: `${size}px`,
      padding: `${size / 2}px ${size}px`,
      maxWidth: '80vw'
    };
  };

  const showNoButton = noCount < phrases.length;

  if (!mounted) return null;

  if (yesPressed) {
    return (
      <main className="relative flex flex-col items-center justify-center h-screen bg-pink-100 text-center p-6 overflow-hidden">
        {/* Floating Hearts Background for Success Screen */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-red-500 opacity-40 animate-float-up"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `-50px`,
                fontSize: `${Math.random() * 20 + 20}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 6 + 4}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>

        <motion.img 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          src="/picture/PROFILE.png" alt="profile"
          className="w-64 md:w-96 mb-4 rounded-xl shadow-2xl z-10"
        />
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 animate-bounce z-10">
          Yay! See you on the 14th! ❤️
        </h1>
      </main>
    );
  }

  return (
    <main className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden bg-pink-50">
      
      {/* FLOATING HEARTS EVERYWHERE */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute text-red-300 opacity-50 animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-10%`,
              fontSize: `${Math.random() * 30 + 10}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="z-10 flex flex-col items-center mb-10">
        <motion.img 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          src="/picture/MING.png" alt="cat"
          className="w-48 md:w-80 mb-6 rounded-xl shadow-lg"
        />
        
        <div className="text-center px-4 w-full max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-bold text-black drop-shadow-[0_2px_10px_rgba(255,255,255,1)]">
            Would you be my Valentine?
          </h1>
          <AnimatePresence mode="wait">
            <motion.p 
              key={noCount}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl text-black mt-6 font-bold italic drop-shadow-[0_2px_10px_rgba(255,255,255,1)]"
            >
              {noCount >= phrases.length ? "please 🥺" : phrases[noCount]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 z-20 w-full px-4">
        <button
          onClick={handleYes}
          className="bg-green-500 hover:bg-green-600 text-white font-black rounded-full transition-all duration-500 shadow-2xl active:scale-95 flex items-center justify-center text-center"
          style={getYesStyles()}
        >
          Yes
        </button>

        {showNoButton && (
          <button
            onClick={handleNoClick}
            className={`bg-red-500 hover:bg-red-700 text-white font-bold rounded-full shadow-xl transition-all duration-75 ${isMoved ? 'fixed' : 'relative'}`}
            style={isMoved ? { 
              left: `${noButtonPos.x}px`, top: `${noButtonPos.y}px`,
              padding: '12px 24px', transform: 'translate(-50%, -50%)',
              transition: 'none', fontSize: '16px', zIndex: 50
            } : { padding: '12px 24px', fontSize: '16px' }}
          >
            No
          </button>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
        .animate-float-up { animation: floatUp linear infinite; }
        body { overflow: hidden; touch-action: manipulation; margin: 0; }
      `}} />
    </main>
  );
}