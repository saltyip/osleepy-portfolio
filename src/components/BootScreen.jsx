import React, { useState, useEffect } from 'react';

const BOOT_LINES = [
  { status: 'starting', text: 'loading kernel modules...' },
  { status: 'ok', text: 'udev initialized' },
  { status: 'starting', text: 'mounting filesystems...' },
  { status: 'ok', text: 'tmpfs ready' },
  { status: 'starting', text: 'spawning sleep daemons...' },
  { status: 'ok', text: 'snooze.service active' },
  { status: 'starting', text: 'waking display manager...' },
  { status: 'ok', text: 'booting into desktop...' },
];

export default function BootScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let timer;
    if (step < BOOT_LINES.length) {
      timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 280);
    } else if (step === BOOT_LINES.length && !isDone) {
      // Pause exactly 280ms before pushing the done line
      timer = setTimeout(() => {
        setIsDone(true);
      }, 280);
    } else if (isDone && !fadingOut) {
      // 600ms pause after completion before fading
      timer = setTimeout(() => {
        setFadingOut(true);
      }, 600);
    } else if (fadingOut) {
      // Wait for the opacity transition to finish before unmounting
      timer = setTimeout(() => {
        onComplete();
      }, 500); // 500ms CSS transition
    }

    return () => clearTimeout(timer);
  }, [step, isDone, fadingOut, onComplete]);

  // Progress logic: 92% until done, then 100%
  const progressPercent = isDone ? 100 : (step / BOOT_LINES.length) * 92;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
      style={{
        backgroundColor: '#1e1e2e',
        opacity: fadingOut ? 0 : (mounted ? 1 : 0),
        transition: fadingOut ? 'opacity 0.5s ease-out' : 'opacity 0.4s ease-out',
        fontFamily: "'JetBrains Mono', monospace"
      }}
    >
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>

      {/* OS Branding */}
      <div className="mb-12 text-center flex flex-col items-center">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6">
          <rect x="36" y="4" width="28" height="8" rx="2" fill="#f9e2af" opacity="0.9" />
          <rect x="42" y="10" width="16" height="5" rx="1" fill="#f9e2af" opacity="0.7" />
          <polygon points="50,18 8,88 92,88" fill="#f9e2af" opacity="0.12" stroke="#f9e2af" stroke-width="2" stroke-linejoin="round" />
          <line x1="8" y1="88" x2="92" y2="88" stroke="#f9e2af" stroke-width="2.5" stroke-linecap="round" />
          <circle cx="50" cy="58" r="18" fill="#1e1e2e" stroke="#cba6f7" stroke-width="2" />
          <path d="M32 58 Q41 46 50 46 Q59 46 68 58" stroke="#cba6f7" stroke-width="1.5" stroke-linecap="round" fill="none" />
          <path d="M32 58 Q41 67 50 67 Q59 67 68 58" stroke="#cba6f7" stroke-width="1.5" stroke-linecap="round" fill="none" />
          <circle cx="50" cy="56" r="8" fill="#cba6f7" opacity="0.9" />
          <circle cx="50" cy="56" r="4" fill="#1e1e2e" />
          <circle cx="52" cy="54" r="1.5" fill="#cba6f7" opacity="0.6" />
          <line x1="22" y1="84" x2="16" y2="96" stroke="#f9e2af" stroke-width="1.5" stroke-linecap="round" opacity="0.7" />
          <line x1="78" y1="84" x2="84" y2="96" stroke="#f9e2af" stroke-width="1.5" stroke-linecap="round" opacity="0.7" />
          <line x1="16" y1="96" x2="26" y2="96" stroke="#f9e2af" stroke-width="2" stroke-linecap="round" opacity="0.7" />
          <line x1="74" y1="96" x2="84" y2="96" stroke="#f9e2af" stroke-width="2" stroke-linecap="round" opacity="0.7" />
          <rect x="28" y="96" width="44" height="5" rx="2" fill="#f9e2af" opacity="0.25" stroke="#f9e2af" stroke-width="1" stroke-opacity="0.4" />
        </svg>
        <h1
          className="text-4xl font-bold mb-2 tracking-[0.2em]"
          style={{ color: '#cba6f7', textTransform: 'lowercase' }}
        >
          osleepy
        </h1>
        <p style={{ color: '#585b70', fontSize: '13px' }}>
          based on arch · always half asleep
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ width: 260, height: 3, backgroundColor: '#313244', marginBottom: 32 }}>
        <div
          style={{
            height: '100%',
            width: progressPercent + '%',
            backgroundColor: '#cba6f7',
            transition: 'width 0.2s ease-out'
          }}
        />
      </div>

      {/* Boot Log */}
      <div style={{ width: 380, fontSize: 13, color: '#6c7086', lineHeight: 1.8 }}>
        {BOOT_LINES.slice(0, step).map((line, idx) => (
          <div key={idx} className="flex">
            <span className="mr-2 whitespace-pre">
              {line.status === 'starting'
                ? <span style={{ color: '#89b4fa' }}>[ starting ]</span>
                : <span style={{ color: '#a6e3a1' }}>[  ok      ]</span>
              }
            </span>
            <span>{line.text}</span>
          </div>
        ))}

        {/* Blinking Cursor moves down automatically with flex-col flow */}
        {!isDone && (
          <div className="flex pt-[2px]">
            <div
              style={{
                width: 7,
                height: 12,
                backgroundColor: '#cba6f7',
                animation: 'blink 1s steps(1) infinite',
              }}
            />
          </div>
        )}

        {/* Final Welcome Line */}
        {isDone && (
          <div className="flex">
            <span className="mr-2 whitespace-pre">
              <span style={{ color: '#cba6f7' }}>[  done    ]</span>
            </span>
            <span>welcome, shaarav.</span>
          </div>
        )}
      </div>
    </div>
  );
}
