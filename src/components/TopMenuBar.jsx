import { useState, useEffect } from 'react';
import { Wifi, BatteryFull, Search } from 'lucide-react';

export default function TopMenuBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-7 bg-mantle/70 backdrop-blur-md border-b border-surface0 flex items-center justify-between px-4 z-[2000] text-xs font-medium text-text select-none">
      <div className="flex items-center gap-4">
        <span className="font-bold cursor-pointer hover:text-mauve transition-colors">Osleepy</span>
        <span className="cursor-pointer hover:bg-surface0 px-2 py-0.5 rounded transition-colors font-bold">File</span>
        <span className="cursor-pointer hover:bg-surface0 px-2 py-0.5 rounded transition-colors hidden sm:block">Edit</span>
        <span className="cursor-pointer hover:bg-surface0 px-2 py-0.5 rounded transition-colors hidden sm:block">View</span>
        <span className="cursor-pointer hover:bg-surface0 px-2 py-0.5 rounded transition-colors hidden md:block">Terminal</span>
        <span className="cursor-pointer hover:bg-surface0 px-2 py-0.5 rounded transition-colors">Help</span>
      </div>

      <div className="flex items-center gap-4">
        <Search size={14} className="cursor-pointer hover:text-mauve transition-colors" />
        <Wifi size={14} className="cursor-pointer hover:text-mauve transition-colors" />
        <BatteryFull size={14} className="cursor-pointer hover:text-mauve transition-colors" />
        <span className="cursor-pointer">
          {time.toLocaleTimeString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
