import { useState, useEffect } from 'react';
import TopMenuBar from './components/TopMenuBar';
import Dock from './components/Dock';
import WindowFrame from './components/WindowFrame';
import Terminal from './components/apps/Terminal';
import MusicPlayer from './components/apps/MusicPlayer';
import FileManager from './components/apps/FileManager';
import StickyNote from './components/apps/StickyNote';
import TextEditor from './components/apps/TextEditor';
import IntroSequence from './components/IntroSequence';
import BootScreen from './components/BootScreen';
import ClickToBegin from './components/ClickToBegin';
import MobileView from './components/MobileView';
import { playClick } from './utils/sfx';
import { ScrollText } from 'lucide-react';
import NotificationToast from './components/NotificationToast';

const APPS = {
  terminal: { title: 'osleepy@cachyos: ~', icon: '💻', component: Terminal, pos: { x: 40, y: 50 }, size: { w: 580, h: 440 } },
  music: { title: 'Music Player', icon: '🎵', component: MusicPlayer, pos: { x: 660, y: 50 }, size: { w: 300, h: 500 } },
  files: { title: '~/projects', icon: '📂', component: FileManager, pos: { x: 80, y: 70 }, size: { w: 820, h: 540 } },
  sticky: { title: 'Notes', icon: '📝', component: StickyNote, pos: { x: 1540, y: 70 }, size: { w: 300, h: 380 } },
  editor: { title: 'profile.json — VSC', icon: '⌨️', component: TextEditor, pos: { x: 740, y: 120 }, size: { w: 780, h: 520 } },
  devlog: { title: 'Devlog', icon: <ScrollText className="w-8 h-8 text-mauve" />, isExternal: true, url: 'https://devlog-app-beta.vercel.app/' }
};

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [appState, setAppState] = useState('click'); // click -> intro -> boot -> desktop
  const [isDoomed, setIsDoomed] = useState(false);
  const [doomStage, setDoomStage] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for doom trigger from Terminal
  useEffect(() => {
    const handleDoom = () => {
      setIsDoomed(true);
      setDoomStage(1);
      setTimeout(() => setDoomStage(2), 3000);  // screen glitch + Bill triangle
      setTimeout(() => setDoomStage(3), 5500);  // intensify
      setTimeout(() => setDoomStage(4), 7500);  // black screen kernel panic
    };
    window.addEventListener('osleepy:doom', handleDoom);
    return () => window.removeEventListener('osleepy:doom', handleDoom);
  }, []);
  const [openWindows, setOpenWindows] = useState({
    terminal: false,
    music: false,
    files: true,
    sticky: true,
    editor: true
  });

  const [showDevlogIntro, setShowDevlogIntro] = useState(() => {
    return !localStorage.getItem('devlog_intro_seen');
  });

  const [windowStack, setWindowStack] = useState(() => {
    const hasIntro = !localStorage.getItem('devlog_intro_seen');
    const baseStack = ['editor', 'sticky', 'files'];
    return hasIntro ? [...baseStack, 'devlogIntro'] : baseStack;
  });
  const activeWindow = windowStack[windowStack.length - 1];

  const focusWindow = (id) => {
    setWindowStack(prev => {
      const filtered = prev.filter(w => w !== id);
      return [...filtered, id];
    });
  };

  const toggleWindow = (id, forceState) => {
    playClick();
    setOpenWindows(prev => ({
      ...prev,
      [id]: forceState !== undefined ? forceState : !prev[id]
    }));
    if (forceState !== false) {
      focusWindow(id);
    }
  };

  const closeWindow = (id) => {
    playClick();
    setOpenWindows(prev => ({ ...prev, [id]: false }));
  };

  if (isMobile) {
    return <MobileView />;
  }

  if (appState === 'click') {
    return <ClickToBegin onStart={() => setAppState('intro')} />;
  }

  if (appState === 'intro') {
    return <IntroSequence onComplete={() => setAppState('boot')} onSkip={() => setAppState('desktop')} />;
  }

  if (appState === 'boot') {
    return <BootScreen onComplete={() => setAppState('desktop')} />;
  }

  return (
    <>
      {isDoomed && (
        <style>{`
          @keyframes violent-shake {
            0% { transform: translate(2px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(0px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(2px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(2px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
          }
          .animate-shake {
            animation: violent-shake 0.3s infinite;
          }
        `}</style>
      )}

      <div className={`relative h-screen w-full overflow-hidden select-none pt-7 transition-all duration-[2000ms] ease-in-out
        ${doomStage >= 1 ? 'animate-shake' : ''}
        ${doomStage >= 2 ? 'invert hue-rotate-180 contrast-[200%] grayscale-[0.5]' : ''}
        ${doomStage >= 4 ? 'hidden' : ''}
      `}>
        <TopMenuBar />

        {/* Desktop Area */}
        <div className="absolute inset-0 z-0 pt-7">
          {/* Desktop Shortcut Icons (Linux Desktop Shell Feel) */}
          <div className="absolute left-6 top-16 flex flex-col gap-5 z-0">
            {Object.entries(APPS).map(([id, config]) => {
              const labels = {
                terminal: 'terminal',
                music: 'lofi_player',
                files: 'projects',
                sticky: 'notes.txt',
                editor: 'profile.json',
                devlog: 'devlog'
              };
              return (
                <div
                  key={id}
                  onClick={() => {
                    if (config.isExternal) {
                      window.open(config.url, '_blank');
                    } else {
                      toggleWindow(id, true);
                    }
                  }}
                  className="flex flex-col items-center justify-center w-16 h-16 rounded-xl cursor-pointer hover:bg-surface0/30 active:scale-95 transition-all gap-1 group text-center select-none"
                >
                  <div className="text-3xl flex items-center justify-center w-10 h-10 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-200">
                    {config.icon}
                  </div>
                  <div className="text-[9px] font-bold text-text/80 group-hover:text-mauve transition-colors truncate max-w-[64px] px-1 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-mono">
                    {labels[id] || id}
                  </div>
                </div>
              );
            })}
          </div>

          {Object.entries(APPS).map(([id, config]) => {
            if (!openWindows[id] || config.isExternal) return null;

            const Content = config.component;
            return (
              <WindowFrame
                key={id}
                id={id}
                title={config.title}
                active={activeWindow === id}
                zIndex={windowStack.indexOf(id) + 10}
                onFocus={() => focusWindow(id)}
                onClose={closeWindow}
                initialPos={config.pos}
                defaultSize={config.size}
              >
                <Content />
              </WindowFrame>
            );
          })}

          {showDevlogIntro && (
            <WindowFrame
              id="devlogIntro"
              title="about-devlog.txt"
              active={activeWindow === 'devlogIntro'}
              zIndex={windowStack.indexOf('devlogIntro') !== -1 ? windowStack.indexOf('devlogIntro') + 10 : 99}
              onFocus={() => focusWindow('devlogIntro')}
              onClose={() => {
                playClick();
                setShowDevlogIntro(false);
                localStorage.setItem('devlog_intro_seen', 'true');
                setWindowStack(prev => prev.filter(w => w !== 'devlogIntro'));
              }}
              initialPos={{ x: 960, y: 150 }}
              defaultSize={{ w: 380, h: 220 }}
            >
              <div className="flex flex-col h-full p-5 font-mono text-xs text-text justify-between">
                <div className="space-y-3">
                  <div className="text-mauve font-bold">/** blog: ... */ comments</div>
                  <p className="text-subtext0 leading-relaxed">
                    This portfolio integrates a live devlog that parses custom JSDoc-style comments directly from my codebase in real-time.
                  </p>
                  <p className="text-subtext1 leading-relaxed">
                    Every commit containing updates inside codeblocks marked with these comments automatically updates devlog.shaarav.dev.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playClick();
                    setShowDevlogIntro(false);
                    localStorage.setItem('devlog_intro_seen', 'true');
                    setWindowStack(prev => prev.filter(w => w !== 'devlogIntro'));
                  }}
                  className="mt-4 w-full py-2 bg-mauve/10 border border-mauve/30 text-mauve hover:bg-mauve/20 rounded-lg font-bold transition-all active:scale-95 cursor-pointer text-center"
                >
                  Dismiss
                </button>
              </div>
            </WindowFrame>
          )}
        </div>

        <Dock
          apps={APPS}
          openWindows={openWindows}
          onToggle={toggleWindow}
          activeWindow={activeWindow}
        />

        <NotificationToast />
      </div>

      {doomStage >= 2 && doomStage < 4 && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center opacity-80 mix-blend-difference">
          <pre className="text-red-500 font-mono text-[10px] md:text-[14px] leading-tight text-center animate-pulse filter drop-shadow-[0_0_30px_rgba(255,0,0,1)]">
{`          /\\
         /  \\
        /____\\
       / \\  / \\
      /   \\/   \\
     /  /\\  /\\  \\
    /  /  \\/  \\  \\
   /__/________\\__\\`}
          </pre>
        </div>
      )}

      {doomStage >= 4 && (
        <div className="fixed inset-0 z-[99999] bg-black text-[#f38ba8] font-mono flex flex-col items-center justify-center text-center p-6">
          <div className="text-4xl md:text-6xl font-black mb-6 tracking-widest drop-shadow-[0_0_15px_rgba(243,139,168,0.8)]">SYSTEM TERMINATED</div>
          <div className="text-sm md:text-lg opacity-80">REALITY IS AN ILLUSION.</div>
          <div className="text-sm md:text-lg opacity-80">THE UNIVERSE IS A HOLOGRAM.</div>
          <div className="text-sm md:text-lg opacity-80 mt-2">BUY GOLD. BYE!</div>
        </div>
      )}
    </>
  );
}
