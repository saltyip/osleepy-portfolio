import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { LayoutGrid } from 'lucide-react';

export default function Taskbar({ apps, openWindows, onToggle, activeWindow }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-mantle/90 backdrop-blur-md border-t border-surface1 flex items-center px-4 justify-between z-[1000]">
      <div className="flex items-center gap-6 flex-grow">
        <div 
          onClick={() => Object.keys(apps).forEach(id => onToggle(id, true))}
          className="distro-logo group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-mauve to-blue flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(203,166,247,0.4)]">
            <LayoutGrid size={18} className="text-base" />
          </div>
        </div>

        <div className="taskbar-items flex gap-2">
          {Object.entries(apps).map(([id, config]) => {
            const isOpen = openWindows[id];
            const isActive = activeWindow === id && isOpen;
            
            return (
              <div 
                key={id} 
                onClick={() => onToggle(id)}
                className={clsx(
                  "taskbar-app w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all relative group",
                  isActive ? "bg-surface2 shadow-lg scale-110 border border-mauve/30" : "bg-surface0 hover:bg-surface1",
                  !isOpen && "opacity-60 grayscale hover:grayscale-0"
                )}
              >
                <div className="text-xl group-hover:scale-110 transition-transform">{config.icon}</div>
                {isOpen && (
                  <div className={clsx(
                    "absolute -bottom-1 w-1.5 h-1.5 rounded-full transition-all duration-300",
                    isActive ? "bg-mauve w-4 shadow-[0_0_8px_var(--mauve)]" : "bg-overlay0"
                  )} />
                )}
                
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-surface1 text-[10px] font-bold text-text rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-surface2 uppercase tracking-tighter">
                  {id}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs font-bold text-subtext1 tracking-widest bg-surface0/30 px-4 py-1.5 rounded-full border border-surface1/30">
        <span className="opacity-50">CACHY_OS</span>
        <div className="w-1 h-3 bg-mauve/30 rounded-full" />
        {time.toLocaleTimeString([], { hour1: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
      </div>
    </div>
  );
}
