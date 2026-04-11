import { useState } from 'react';
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
import { playClick } from './utils/sfx';

const APPS = {
  terminal: { title: 'osleepy@cachyos: ~', icon: '💻', component: Terminal, pos: { x: 40, y: 50 }, size: { w: 580, h: 440 } },
  music: { title: 'Music Player', icon: '🎵', component: MusicPlayer, pos: { x: 660, y: 50 }, size: { w: 300, h: 500 } },
  files: { title: '~/projects', icon: '📂', component: FileManager, pos: { x: 19, y: 537 }, size: { w: 811, h: 380 } },
  sticky: { title: 'Notes', icon: '📝', component: StickyNote, pos: { x: 1117, y: 506 }, size: { w: 280, h: 359 } },
  editor: { title: 'profile.json — VSC', icon: '⌨️', component: TextEditor, pos: { x: 1000, y: 50 }, size: { w: 880, h: 440 } }
};

export default function App() {
  const [appState, setAppState] = useState('click'); // click -> intro -> boot -> desktop
  const [openWindows, setOpenWindows] = useState({
    terminal: true,
    music: true,
    files: true,
    sticky: true,
    editor: true
  });

  const [windowStack, setWindowStack] = useState(['editor', 'terminal', 'music', 'files', 'sticky']);
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

  if (appState === 'click') {
    return <ClickToBegin onStart={() => setAppState('intro')} />;
  }

  if (appState === 'intro') {
    return <IntroSequence onComplete={() => setAppState('boot')} />;
  }

  if (appState === 'boot') {
    return <BootScreen onComplete={() => setAppState('desktop')} />;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden select-none pt-7">
      <TopMenuBar />

      {/* Desktop Area */}
      <div className="absolute inset-0 z-0 pt-7">
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
