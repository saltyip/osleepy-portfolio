import React, { useState, useEffect } from 'react';
import BootScreen from './BootScreen';
import { playBootHum } from '../utils/sfx';

export default function WakeUpSequence({ onComplete }) {
  const [phase, setPhase] = useState('black');
  const [bootFinished, setBootFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (phase === 'black') {
      const t = setTimeout(() => setPhase('text1'), 400);
      return () => clearTimeout(t);
    }
    if (phase === 'text1') {
      const t = setTimeout(() => setPhase('text2'), 500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'text1' || phase === 'text2') {
      const handleKey = () => setPhase('fadeout');
      window.addEventListener('keydown', handleKey);
      window.addEventListener('mousedown', handleKey);
      return () => {
        window.removeEventListener('keydown', handleKey);
        window.removeEventListener('mousedown', handleKey);
      };
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'fadeout') {
      const t = setTimeout(() => {
        setPhase('eyeOpen');
        playBootHum();
      }, 300);
      return () => clearTimeout(t);
    }
    if (phase === 'eyeOpen') {
      const t = setTimeout(() => {
        setPhase('done');
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'done' && bootFinished) {
      setIsExiting(true);
      const t = setTimeout(() => {
        onComplete();
      }, 1200); // smooth 1.2s fade to black before unmounting
      return () => clearTimeout(t);
    }
  }, [phase, bootFinished, onComplete]);

  return (
    <>
      {/* Final Fade Out Overlay */}
      <div 
        className="fixed inset-0 bg-black pointer-events-none z-[100000]"
        style={{
          opacity: isExiting ? 1 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      <style>
        {`
          @keyframes slowPulse {
            0% { opacity: 0.8; text-shadow: 0 0 15px rgba(255, 255, 255, 0.7); }
            100% { opacity: 1.0; text-shadow: 0 0 30px rgba(255, 255, 255, 1); }
          }
          @keyframes slowBlink {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          
          @keyframes bubbleUp {
            0% { transform: translateY(10px) scale(0.5); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translateY(-40px) scale(1.2); opacity: 0; }
          }
          
          @property --inner {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          @property --outer {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 40%;
          }
          
          .vignette-overlay {
            --inner: 0%;
            --outer: 40%;
            background: radial-gradient(circle, transparent var(--inner), black var(--outer));
            transition: --inner 2.5s cubic-bezier(0.4, 0, 0.2, 1), --outer 2.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .vignette-overlay.waking {
            --inner: 120%;
            --outer: 160%;
          }
        `}
      </style>

      {/* The Room Scene */}
      <div className="fixed inset-0 z-[10] bg-[#050508] flex flex-col items-center justify-center overflow-hidden">

        {/* Wall Ambient Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(137, 120, 200, 0.12) 0%, transparent 70%)',
          }}
        />

        {/* Secondary Light Source (Off-screen Neon Pink) */}
        <div className="absolute top-[20vh] -left-[20vw] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(243,139,168,0.05)_0%,transparent_70%)] pointer-events-none z-0" />

        {/* Wall Clutter - Left Side (Blueprint) */}
        <div className="absolute top-[10vh] left-[15vw] w-48 h-64 border border-[#1e1e2e] bg-[#11111b]/80 shadow-2xl transform -rotate-3 z-0 flex flex-col items-center justify-center p-2 border-opacity-50">
           <div className="w-full h-full border border-[#89b4fa]/20 bg-[linear-gradient(rgba(137,180,250,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(137,180,250,0.1)_1px,transparent_1px)]" style={{ backgroundSize: '10px 10px' }}>
              <svg className="w-full h-full opacity-30" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" stroke="#89b4fa" strokeWidth="2" fill="none" />
                <line x1="50" y1="20" x2="50" y2="80" stroke="#89b4fa" strokeWidth="1" />
                <line x1="20" y1="50" x2="80" y2="50" stroke="#89b4fa" strokeWidth="1" />
              </svg>
           </div>
           <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#f9e2af]/40 rotate-2 opacity-50 backdrop-blur-sm shadow-sm" />
        </div>

        {/* Polaroids - Right Side */}
        <div className="absolute top-[25vh] right-[20vw] w-24 h-32 bg-white/10 p-2 pb-8 shadow-2xl transform rotate-6 z-0 border border-white/5 backdrop-blur-md">
           <div className="w-full h-full bg-[#050508]/80 shadow-inner" />
           <div className="absolute -top-2 right-4 w-8 h-4 bg-[#f38ba8]/40 -rotate-6 opacity-50" />
        </div>
        <div className="absolute top-[15vh] right-[15vw] w-24 h-32 bg-white/5 p-2 pb-8 shadow-2xl transform -rotate-12 z-0 border border-white/5 backdrop-blur-sm">
           <div className="w-full h-full bg-[#050508]/90 shadow-inner" />
           <div className="absolute -top-2 left-2 w-8 h-4 bg-[#89dceb]/40 rotate-12 opacity-50" />
        </div>

        {/* Sci-Fi Vial / Strange Device */}
        <div className="absolute bottom-[15vh] left-[calc(50%-550px)] w-10 h-20 z-[15] flex flex-col items-center shadow-[10px_10px_20px_rgba(0,0,0,0.8)]">
           <div className="w-6 h-3 bg-[#313244] rounded-t-sm border-b-2 border-[#11111b] z-10" />
           <div className="w-10 h-16 bg-gradient-to-b from-transparent to-[#a6e3a1]/20 border border-[#a6e3a1]/40 rounded-b-lg shadow-[0_0_30px_rgba(166,227,161,0.2)] relative overflow-hidden -mt-1">
              <div className="absolute bottom-0 w-full h-[60%] bg-[#a6e3a1]/40 shadow-[0_0_20px_#a6e3a1] animate-pulse" />
              <div className="absolute bottom-1 left-2 w-1.5 h-1.5 bg-white/60 rounded-full animate-[bubbleUp_2s_infinite]" />
              <div className="absolute bottom-3 right-2 w-1 h-1 bg-white/60 rounded-full animate-[bubbleUp_1.5s_infinite_0.5s]" />
           </div>
        </div>

        {/* Tangled Cables */}
        <svg className="absolute bottom-[4vh] left-[15vw] w-64 h-24 pointer-events-none z-[10] overflow-visible opacity-30">
           <path d="M 0 30 Q 40 -10 80 20 T 160 10 T 240 40" fill="transparent" stroke="#11111b" strokeWidth="4" strokeLinecap="round" />
           <path d="M -20 50 Q 30 70 60 30 T 120 40 T 200 15" fill="transparent" stroke="#0a0a0f" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <svg className="absolute bottom-[2vh] right-[15vw] w-48 h-24 pointer-events-none z-[10] overflow-visible opacity-40">
           <path d="M 200 30 Q 150 80 80 20 T 0 50" fill="transparent" stroke="#11111b" strokeWidth="5" strokeLinecap="round" />
        </svg>

        {/* Mysterious Glowing Symbol (Gravity Falls Journal Vibe) */}
        <div className="absolute top-[8vh] right-[35vw] opacity-30 z-0 drop-shadow-[0_0_15px_rgba(249,226,175,0.6)] mix-blend-screen">
           <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
             <polygon points="50,15 85,85 15,85" stroke="#f9e2af" strokeWidth="2" strokeDasharray="4,4" />
             <circle cx="50" cy="65" r="12" stroke="#f9e2af" strokeWidth="2" />
             <path d="M 50 65 L 50 53" stroke="#f9e2af" strokeWidth="2" />
           </svg>
        </div>

        {/* Desk Surface & Lighting */}
        <div className="absolute bottom-0 w-full h-[35vh] z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] to-[#030305] border-t border-t-[#11111b]/80" />
          {/* Light pool from monitor */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-full bg-[radial-gradient(ellipse_at_top,rgba(137,180,250,0.08)_0%,transparent_60%)]" />

          {/* Desk Mat */}
          <div
            className="absolute top-[4vh] left-1/2 -translate-x-1/2 w-[850px] h-[30vh] bg-[#050508] rounded-xl border border-[#11111b] shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            style={{ transform: 'perspective(800px) rotateX(65deg)' }}
          />
        </div>

        {/* Monitor Assembly */}
        <div className="relative z-10 flex flex-col items-center mb-16">
          {/* Monitor Screen & Bezel */}
          <div className="relative w-[800px] max-w-[90vw] h-[560px] max-h-[65vh] bg-[#1e1e2e] border-[16px] border-[#0a0a0f] rounded-xl overflow-hidden shadow-[0_0_80px_rgba(137,180,250,0.15)] flex flex-col">
            
            {/* Monitor Edge Highlight (Pink side light reflection) */}
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-r from-[#f38ba8]/10 to-transparent pointer-events-none z-30" />

            {/* Sticky Note */}
            <div className="absolute bottom-4 right-6 w-14 h-14 bg-[#f9e2af]/90 shadow-md transform rotate-[12deg] z-[30] overflow-hidden flex flex-col p-2 border-b border-r border-[#11111b]/20">
              <div className="w-full h-0.5 bg-[#1e1e2e]/20 mb-1.5" />
              <div className="w-3/4 h-0.5 bg-[#1e1e2e]/20 mb-1.5" />
              <div className="w-full h-0.5 bg-[#1e1e2e]/20 mb-1.5" />
            </div>

            {/* Boot Screen running inside monitor, starting on keypress */}
            <BootScreen onComplete={() => setBootFinished(true)} embedded={true} start={phase === 'fadeout' || phase === 'eyeOpen' || phase === 'done'} />

            {/* CRT Scanlines Overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.15) 50%)',
                backgroundSize: '100% 4px',
              }}
            />
          </div>

          {/* Monitor Stand */}
          <div className="relative w-24 h-16 bg-[#0a0a0f] flex justify-center -mt-2 z-[-1]">
            <div className="absolute bottom-0 w-48 h-4 bg-[#11111b] rounded-t-md" />
          </div>
        </div>

        {/* Speakers */}
        <div className="absolute bottom-[18vh] left-[calc(50%-480px)] w-20 h-40 bg-[#0a0a0f] rounded-sm border-r border-t border-[#1e1e2e]/30 shadow-[-15px_15px_20px_rgba(0,0,0,0.8)] flex flex-col items-center justify-end pb-4 z-[5]">
          <div className="w-12 h-12 rounded-full bg-[#050508] shadow-[inset_0_4px_8px_rgba(0,0,0,0.9)] border border-[#11111b]" />
          <div className="w-6 h-6 rounded-full bg-[#050508] mt-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] border border-[#11111b]" />
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#89b4fa]/10 to-transparent" />
        </div>

        <div className="absolute bottom-[18vh] right-[calc(50%-480px)] w-20 h-40 bg-[#0a0a0f] rounded-sm border-l border-t border-[#1e1e2e]/30 shadow-[15px_15px_20px_rgba(0,0,0,0.8)] flex flex-col items-center justify-end pb-4 z-[5]">
          <div className="w-12 h-12 rounded-full bg-[#050508] shadow-[inset_0_4px_8px_rgba(0,0,0,0.9)] border border-[#11111b]" />
          <div className="w-6 h-6 rounded-full bg-[#050508] mt-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] border border-[#11111b]" />
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#89b4fa]/10 to-transparent" />
        </div>

        {/* Coffee Mug */}
        <div className="absolute bottom-[10vh] left-[calc(50%-380px)] w-14 h-16 bg-[#0a0a0f] rounded-b-xl rounded-t-sm z-[15] shadow-[-15px_10px_20px_rgba(0,0,0,0.8)] border-r border-[#89b4fa]/15">
          <div className="absolute top-3 -left-5 w-6 h-10 border-4 border-[#0a0a0f] rounded-l-full border-r-0 shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]" />
          <div className="absolute -top-6 left-3 w-1.5 h-10 bg-white/5 blur-sm rounded-full animate-[pulse_3s_infinite]" />
          <div className="absolute -top-4 left-6 w-1 h-8 bg-white/5 blur-sm rounded-full animate-[pulse_4s_infinite_0.5s]" />
        </div>

        {/* Floppy Disks */}
        <div className="absolute bottom-[12vh] right-[calc(50%-360px)] w-20 h-5 z-[15] group">
          <div className="absolute bottom-0 w-20 h-2 bg-[#11111b] border-t border-[#313244]/40 rounded-sm transform rotate-[-5deg] shadow-[0_5px_10px_rgba(0,0,0,0.9)]" />
          <div className="absolute bottom-1 w-20 h-2 bg-[#0a0a0f] border-t border-l border-[#89b4fa]/15 rounded-sm transform rotate-[3deg] shadow-[0_2px_5px_rgba(0,0,0,0.5)]" />
          <div className="absolute bottom-2.5 w-20 h-3 bg-[#181825] border-t border-l border-[#89b4fa]/20 rounded-sm transform rotate-[-2deg] shadow-[0_2px_5px_rgba(0,0,0,0.5)] flex items-center justify-center">
            <div className="w-12 h-1.5 bg-[#050508] mt-0.5" />
          </div>
        </div>

        {/* Retro Mouse */}
        <div
          className="absolute bottom-[4vh] right-[calc(50%-300px)] w-12 h-20 bg-[#0a0a0f] rounded-2xl z-[15] border-l border-t border-[#89b4fa]/15 shadow-[10px_10px_20px_rgba(0,0,0,0.8)]"
          style={{ transform: 'perspective(500px) rotateX(60deg) rotateZ(-15deg)' }}
        >
          <div className="absolute top-0 left-0 w-1/2 h-8 border-r border-b border-[#050508] rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-1/2 h-8 border-b border-[#050508] rounded-tr-2xl" />
          <svg className="absolute -top-24 left-6 w-16 h-24 overflow-visible pointer-events-none">
            <path d="M 0 0 Q 30 -40 10 -80 T 50 -120" fill="transparent" stroke="#0a0a0f" strokeWidth="2" />
          </svg>
        </div>

        {/* Keyboard silhouette at bottom */}
        <div
          className="absolute bottom-[5vh] z-10 left-1/2 -translate-x-1/2 w-[700px] h-[100px] bg-[#0a0a0f] rounded-t-2xl opacity-90 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          style={{ transform: 'perspective(500px) rotateX(70deg)' }}
        >
          {/* Subtle keyboard grid */}
          <div className="w-full h-full border-t-2 border-[#1e1e2e] opacity-40 flex flex-wrap gap-2 p-4 justify-center overflow-hidden">
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className="bg-[#181825] w-10 h-10 rounded-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"></div>
            ))}
          </div>
        </div>

        {/* Global Film Grain / Noise Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[50] opacity-[0.04]">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Blur Layer */}
      {phase !== 'done' && (
        <div
          className="fixed inset-0 z-[9998] pointer-events-none"
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            opacity: phase === 'eyeOpen' ? 0 : 1,
            transition: 'opacity 1.5s ease-out',
          }}
        />
      )}

      {/* Vignette Overlay & Text */}
      {phase !== 'done' && (
        <div
          className={`vignette-overlay fixed inset-0 z-[9999] pointer-events-none flex flex-col ${phase === 'eyeOpen' ? 'waking' : ''}`}
        >
          {/* Text Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-center z-20">
            <div
              style={{
                color: '#ffffff',
                opacity: phase === 'text1' || phase === 'text2' ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
                fontSize: '13px',
                letterSpacing: '0.4em',
                animation: (phase === 'text1' || phase === 'text2') ? 'slowPulse 4s infinite alternate' : 'none',
              }}
            >
              w a k e &nbsp; u p .
            </div>

            <div
              style={{
                color: '#bac2de', // subtext1 color
                opacity: phase === 'text2' ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
                fontSize: '10px',
                letterSpacing: '0.2em',
                marginTop: '24px',
                animation: phase === 'text2' ? 'slowBlink 3s infinite' : 'none',
              }}
            >
              [ press any key ]
            </div>
          </div>
        </div>
      )}

      {/* Skip Button */}
      {phase !== 'done' && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="fixed bottom-8 right-8 z-[10000] text-[#bac2de] hover:text-[#cba6f7] font-mono text-xs opacity-80 hover:opacity-100 transition-all cursor-pointer uppercase tracking-widest border border-[#313244] hover:border-[#cba6f7]/50 bg-[#11111b]/80 px-3 py-1.5 rounded-lg"
        >
          [ skip to desktop ]
        </button>
      )}
    </>
  );
}
