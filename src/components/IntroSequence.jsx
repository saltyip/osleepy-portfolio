import React, { useEffect, useRef } from 'react';
import { playBootHum, playClick } from '../utils/sfx';

export default function IntroSequence({ onComplete, onSkip }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const fadeOverlayRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let isCompleteTriggered = false;
    let isMonitorActive = false;

    // Lock scroll restoration so we start at the top on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Aesthetic Palette
    const palette = {
      sky: '#fab387',     // peach morning sky
      sun: '#f9e2af',     // yellow sun
      tree: '#a6e3a1',    // green tree
      wallOuter: '#11111b', // crust
      wallInner: '#1e1e2e', // base
      floor: '#181825',   // mantle
      frame: '#313244',   // surface0
      bed: '#585b70',     // surface2
      blanket: '#cba6f7', // mauve
      pillow: '#cdd6f4',  // text
      desk: '#45475a',    // surface1
      monitor: '#11111b', // crust
      screen: '#89b4fa',  // blue glow
      skin: '#f5e0dc',    // rosewater
      shirt: '#f38ba8',   // red/warm pink
      pants: '#11111b'    // crust
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(currentProgressRef.current);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      let progress = scrollY / (maxScroll || 1);

      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      targetProgressRef.current = progress;
    };
    window.addEventListener('scroll', handleScroll);

    const tick = () => {
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.12;
      const progress = currentProgressRef.current;
      draw(progress);

      if (scrollIndicatorRef.current) {
        // Fades out completely within the first 16% of scroll progress
        scrollIndicatorRef.current.style.opacity = Math.max(0, 1 - progress * 6);
      }

      // Trigger CSS fade explicitly decoupling it from the scroll jitter
      if (progress >= 0.95) {
        if (fadeOverlayRef.current && fadeOverlayRef.current.style.opacity !== '1') {
          fadeOverlayRef.current.style.opacity = '1';
          playBootHum();
        }
      } else {
        if (fadeOverlayRef.current && fadeOverlayRef.current.style.opacity !== '0') {
          fadeOverlayRef.current.style.opacity = '0';
        }
      }

      // Lerp exponentially slows down approaching 1.0, so trigger near the peak
      if (progress >= 0.995 && !isCompleteTriggered && onComplete) {
        isCompleteTriggered = true;
        setTimeout(onComplete, 600);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    function draw(p) {
      const w = canvas.width;
      const h = canvas.height;

      // Crisp pixel art rendering
      ctx.imageSmoothingEnabled = false;

      // Clear background
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);

      const minDimension = Math.min(w, h);

      const gridW = 100;
      const gridH = 60;
      // Make the 100x60 box fit cleanly in the center
      const scale = Math.min(w / gridW, h / gridH) * 0.9;

      const offsetX = w / 2 - (gridW * scale) / 2;
      const offsetY = h / 2 - (gridH * scale) / 2;

      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);

      // Outer border / darkness
      ctx.fillStyle = '#0a0a14';
      ctx.fillRect(-10, -10, 120, 80);

      // --- Room Environment ---
      // Wall
      ctx.fillStyle = palette.wallInner;
      ctx.fillRect(0, 0, 100, 45);

      // Baseboard / Floor Line
      ctx.fillStyle = '#11111b';
      ctx.fillRect(0, 44, 100, 1);

      // Floor
      ctx.fillStyle = palette.floor;
      ctx.fillRect(0, 45, 100, 15);

      // Window Frame & Glass
      ctx.fillStyle = palette.frame;
      ctx.fillRect(15, 10, 20, 20);
      ctx.fillStyle = '#74c7ec'; // morning light sky
      ctx.fillRect(16, 11, 18, 18);
      // Window Light on floor
      ctx.fillStyle = 'rgba(116, 199, 236, 0.08)';
      ctx.fillRect(10, 45, 30, 8);

      // Poster / Shelf Detail
      ctx.fillStyle = palette.frame;
      ctx.fillRect(45, 12, 10, 14); // Frame
      ctx.fillStyle = '#eba0ac'; // Insert
      ctx.fillRect(46, 13, 8, 12);
      ctx.fillStyle = '#f9e2af'; // Star/Decoration
      ctx.fillRect(48, 16, 4, 4);

      // Bed Frame
      ctx.fillStyle = '#45475a';
      ctx.fillRect(5, 37, 34, 8);  // Main base
      ctx.fillRect(5, 30, 3, 15);  // Headboard
      ctx.fillRect(38, 35, 2, 10); // Footboard

      // Mattress
      ctx.fillStyle = '#b4befe';
      ctx.fillRect(8, 34, 30, 3);

      // Pillow
      ctx.fillStyle = palette.pillow;
      ctx.fillRect(9, 31, 8, 4);

      // Desk Base
      ctx.fillStyle = palette.desk;
      ctx.fillRect(72, 34, 23, 11);
      // Table top
      ctx.fillStyle = palette.frame;
      ctx.fillRect(70, 32, 27, 2);

      // Monitor Screen (Off)
      ctx.fillStyle = palette.monitor;
      ctx.fillRect(76, 20, 16, 10);
      // Stand
      ctx.fillStyle = '#11111b';
      ctx.fillRect(82, 30, 4, 2);

      // Chair
      ctx.fillStyle = palette.frame;
      ctx.fillRect(64, 38, 8, 2); // Seat lowered to fit new desk
      ctx.fillRect(66, 40, 4, 5); // Leg to floor

      // --- Character & Animation Logic ---
      let charX, charY, pose;
      let walkProgress = 0;

      if (p < 0.25) {
        pose = 'sleeping';
        charX = 10; charY = 28; // head perfectly on pillow
      } else if (p < 0.4) {
        pose = 'sitting_up';
        charX = 13; charY = 22;
      } else if (p < 0.7) {
        pose = 'walking';
        walkProgress = Math.max(0, (p - 0.4) / 0.3);
        charX = 14 + walkProgress * (48);
        charY = 25; // Floor is 45. Head:6, Body:8, Legs:6 -> 20. 45-20=25. Perfectly touching floor.
      } else if (p < 0.8) {
        pose = 'sitting';
        charX = 64; charY = 24; // Lowered Y to fit lower chair
      } else {
        pose = 'monitor_on';
        charX = 64; charY = 24;
      }

      // Snap coordinates to integers to prevent pixel-art anti-aliasing blur
      charX = Math.round(charX);
      charY = Math.round(charY);

      // Render Character Parts & Corresponding Blanket Logic
      if (pose === 'sleeping') {
        // Just the head resting
        ctx.fillStyle = palette.skin;
        ctx.fillRect(charX, charY, 6, 6);

        // Detailed Cozy Blanket
        ctx.fillStyle = palette.blanket;
        ctx.fillRect(15, 33, 23, 5); // top
        ctx.fillRect(15, 38, 20, 3); // drape side
        // Folds / Shade
        ctx.fillStyle = '#bca1e0';
        ctx.fillRect(19, 33, 2, 8);
        ctx.fillRect(27, 33, 2, 8);
      }
      else if (pose === 'sitting_up') {
        // Head and Body
        ctx.fillStyle = palette.skin; ctx.fillRect(charX, charY, 6, 6);
        ctx.fillStyle = palette.shirt; ctx.fillRect(charX, charY + 6, 6, 8);

        // Folded scrunched blanket
        ctx.fillStyle = palette.blanket;
        ctx.fillRect(16, 35, 14, 5);
        ctx.fillRect(15, 39, 16, 4);
      }
      else if (pose === 'walking') {
        // Tie cycle directly to linear progress, preventing frame skips from X pixel jumps
        const cycleSteps = Math.floor(walkProgress * 24);
        const cycleFrame = cycleSteps % 4; // 0, 1, 2, 3

        // Bob down on frames 1 and 3
        const charBob = (cycleFrame === 1 || cycleFrame === 3) ? 1 : 0;

        // Bobbing body
        ctx.fillStyle = palette.skin; ctx.fillRect(charX, charY - charBob, 6, 6);
        ctx.fillStyle = palette.shirt; ctx.fillRect(charX, charY + 6 - charBob, 6, 8);

        // Stepping Legs
        ctx.fillStyle = palette.pants;
        if (cycleFrame === 0 || cycleFrame === 2) {
          // Neutral pose (Legs straight down)
          ctx.fillRect(charX, charY + 14 - charBob, 2, 6);
          ctx.fillRect(charX + 4, charY + 14 - charBob, 2, 6);
        } else if (cycleFrame === 1) {
          // Left leg steps forward, right steps back
          ctx.fillRect(charX - 1, charY + 14 - charBob, 2, 6);
          ctx.fillRect(charX + 3, charY + 14 - charBob, 2, 6);
        } else if (cycleFrame === 3) {
          // Right leg steps forward, left steps back
          ctx.fillRect(charX + 1, charY + 14 - charBob, 2, 6);
          ctx.fillRect(charX + 5, charY + 14 - charBob, 2, 6);
        }

        // Empty bed blanket
        ctx.fillStyle = palette.blanket;
        ctx.fillRect(12, 35, 18, 4);
        ctx.fillRect(14, 39, 12, 3);
      }
      else if (pose === 'sitting' || pose === 'monitor_on') {
        ctx.fillStyle = palette.skin; ctx.fillRect(charX, charY, 6, 6);
        ctx.fillStyle = palette.shirt; ctx.fillRect(charX, charY + 6, 6, 8);
        ctx.fillStyle = palette.pants; ctx.fillRect(charX, charY + 14, 6, 6); // folded sitting legs

        if (pose === 'monitor_on') {
          // Arm pressing button exactly on the monitor base
          ctx.fillStyle = palette.skin;
          ctx.fillRect(charX + 6, charY + 7, 7, 2);
        }

        // Empty bed blanket
        ctx.fillStyle = palette.blanket;
        ctx.fillRect(12, 35, 18, 4);
        ctx.fillRect(14, 39, 12, 3);
      }

      // --- Monitor Power & Glow ---
      if (p >= 0.8) {
        if (!isMonitorActive) {
          isMonitorActive = true;
          playClick();
        }
        // Flashes bright screen perfectly fitted into monitor bounds
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(76, 20, 16, 10);

        // Soft blue room glow overlay
        const glowP = Math.min((p - 0.8) * 5, 0.4);
        ctx.fillStyle = `rgba(137, 180, 250, ${glowP})`;
        ctx.fillRect(0, 0, 100, 60);
      } else {
        isMonitorActive = false;
      }

      ctx.restore();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="relative bg-[#0a0a14]" style={{ height: '500vh' }}>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9990]"
      />

      {/* 0.6s CSS Dark Fade Interface */}
      <div
        ref={fadeOverlayRef}
        className="fixed inset-0 bg-[#1e1e2e] pointer-events-none z-[10000] opacity-0 transition-opacity duration-700"
        style={{ transitionDuration: '600ms' }}
      />

      {/* Scroll indicator - fades out quickly */}
      <div
        ref={scrollIndicatorRef}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 text-mauve font-mono text-xs font-bold tracking-widest animate-bounce z-[10000] flex flex-col items-center gap-1 select-none"
      >
        <span>↓ scroll down to walk ↓</span>
      </div>

      {/* Skip Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          playBootHum();
          if (onSkip) {
            onSkip();
          } else {
            onComplete();
          }
        }}
        className="fixed bottom-10 right-10 text-subtext0 hover:text-mauve font-mono text-xs opacity-60 hover:opacity-100 transition-all z-[10001] bg-[#181825]/80 border border-surface1 hover:border-mauve rounded-lg px-3 py-1.5 cursor-pointer uppercase tracking-widest shadow-lg"
      >
        [ skip to desktop ]
      </button>
    </div>
  );
}
