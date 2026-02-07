"use client";

import React, { useState, useEffect } from 'react';

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

  const yesButtonSize = noCount * 25 + 20; 
  const noButtonSize = Math.max(18 - noCount * 1.5, 6);

  // The No button will be removed once we've clicked past the last phrase
  const showNoButton = noCount < phrases.length;

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    
    const padding = 100; 
    const maxWidth = window.innerWidth - padding;
    const maxHeight = window.innerHeight - padding;
    
    const randomX = Math.max(padding, Math.random() * maxWidth);
    const randomY = Math.max(padding, Math.random() * maxHeight);
    
    setNoButtonPos({ x: randomX, y: randomY });
    setIsMoved(true);
  };

  if (yesPressed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-pink-100 text-center p-6">
        <img 
          src="/picture/PROFILE.png" 
          alt="celebration" 
          className="w-full max-w-[500px] mb-4 rounded-xl shadow-2xl z-10"
        />
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 animate-bounce z-10">
          Yay! See you on the 14th! ❤️
        </h1>
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <main className="flex flex-col items-center justify-center h-screen w-full overflow-hidden relative p-4 bg-pink-50">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/picture/1368.png" 
          alt="background" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* FLOATING HEARTS */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute text-red-400 opacity-60 animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-50px`,
              fontSize: `${Math.random() * 20 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 8 + 4}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* TEXT CONTENT */}
      <div className="text-center z-20 mb-12 px-4 w-full relative">
        <h1 className="text-4xl md:text-7xl font-bold text-black drop-shadow-[0_4px_12px_rgba(255,255,255,1)]">
          Would you be my Valentine?
        </h1>
        
        <p className="text-2xl md:text-4xl text-black mt-6 font-bold italic min-h-[50px] drop-shadow-[0_2px_10px_rgba(255,255,255,1)] uppercase tracking-wide transition-all">
          {/* Logic: Cycle through phrases, then show "please 🥺" once button is gone */}
          {noCount > 0 && noCount < phrases.length 
            ? phrases[noCount] 
            : noCount >= phrases.length 
              ? "please 🥺" 
              : ""
          }
        </p>
      </div>

      {/* BUTTON CONTAINER */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 z-20 w-full relative">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-black rounded-full transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.3)] active:scale-95 whitespace-nowrap"
          style={{ 
            fontSize: `${yesButtonSize}px`, 
            padding: `${yesButtonSize / 2}px ${yesButtonSize}px`,
            maxWidth: '95vw',
            lineHeight: '1'
          }}
          onClick={() => setYesPressed(true)}
        >
          Yes
        </button>

        {showNoButton && (
          <button
            onClick={handleNoClick}
            className={`bg-red-500 hover:bg-red-700 text-white font-bold rounded-full transition-all duration-100 shadow-xl ${isMoved ? 'fixed' : 'relative'}`}
            style={isMoved ? { 
              left: `${noButtonPos.x}px`, 
              top: `${noButtonPos.y}px`,
              fontSize: `${noButtonSize}px`,
              padding: `${noButtonSize / 2}px ${noButtonSize}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: 50
            } : {
              fontSize: `${noButtonSize}px`,
              padding: `${noButtonSize / 2}px ${noButtonSize}px`
            }}
          >
            No
          </button>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
        .animate-float-up {
          animation: floatUp linear infinite;
        }
        body {
          overflow: hidden;
          margin: 0;
          height: 100vh;
          width: 100vw;
        }
      `}} />
    </main>
  );
}