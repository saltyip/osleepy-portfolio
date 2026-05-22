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

const APPS = {
  terminal: { title: 'osleepy@cachyos: ~', icon: '💻', component: Terminal, pos: { x: 40, y: 50 }, size: { w: 580, h: 440 } },
  music: { title: 'Music Player', icon: '🎵', component: MusicPlayer, pos: { x: 660, y: 50 }, size: { w: 300, h: 500 } },
  files: { title: '~/projects', icon: '📂', component: FileManager, pos: { x: 80, y: 70 }, size: { w: 820, h: 540 } },
  sticky: { title: 'Notes', icon: '📝', component: StickyNote, pos: { x: 1540, y: 70 }, size: { w: 300, h: 380 } },
  editor: { title: 'profile.json — VSC', icon: '⌨️', component: TextEditor, pos: { x: 740, y: 120 }, size: { w: 780, h: 520 } }
};

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [appState, setAppState] = useState('click'); // click -> intro -> boot -> desktop

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const [openWindows, setOpenWindows] = useState({
    terminal: false,
    music: false,
    files: true,
    sticky: true,
    editor: true
  });

  const [windowStack, setWindowStack] = useState(['editor', 'sticky', 'files']);
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
    <div className="relative h-screen w-full overflow-hidden select-none pt-7">
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
              editor: 'profile.json'
            };
            return (
              <div
                key={id}
                onClick={() => toggleWindow(id, true)}
                className="flex flex-col items-center justify-center w-16 h-16 rounded-xl cursor-pointer hover:bg-surface0/30 active:scale-95 transition-all gap-1 group text-center select-none"
              >
                <div className="text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-200">
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
          if (!openWindows[id]) return null;

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
      </div>

      <Dock
        apps={APPS}
        openWindows={openWindows}
        onToggle={toggleWindow}
        activeWindow={activeWindow}
      />
    </div>
  );
}
