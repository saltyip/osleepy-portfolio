import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { LayoutGrid } from 'lucide-react';

export default function Dock({ apps, openWindows, onToggle, activeWindow }) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[2000]">
      <div className="flex items-end gap-2 px-3 py-2 bg-mantle/60 backdrop-blur-xl border border-surface1 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        
        {/* Launcher icon */}
        <motion.div
          whileHover={{ scale: 1.2, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => Object.keys(apps).forEach(id => onToggle(id, true))}
          className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-mauve to-blue flex items-center justify-center cursor-pointer shadow-lg mr-2"
        >
          <LayoutGrid size={24} className="text-base" />
        </motion.div>

        {/* separator line */}
        <div className="w-[1px] h-10 bg-surface1 mx-1 self-center" />

        {Object.entries(apps).map(([id, config]) => {
          const isOpen = openWindows[id];
          const isActive = activeWindow === id && isOpen;
          
          return (
            <motion.div
              key={id}
              onClick={() => onToggle(id)}
              whileHover={{ scale: 1.25, y: -8 }}
              whileTap={{ scale: 0.95 }}
              className={clsx(
                "relative flex items-center justify-center w-12 h-12 rounded-xl cursor-pointer shadow-md origin-bottom",
                isActive ? "bg-surface2 border border-mauve/40" : "bg-surface0",
                !isOpen && "opacity-70 grayscale hover:grayscale-0"
              )}
            >
              <div className="text-2xl">{config.icon}</div>
              
              {/* Active Indicator */}
              {isOpen && (
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-mauve rounded-full shadow-[0_0_5px_var(--color-mauve)]" />
              )}

              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-surface1/90 text-[10px] font-bold text-text rounded opacity-0 hover:opacity-0 transition-opacity border border-surface2 whitespace-nowrap pointer-events-none group-hover:opacity-100">
                {config.title}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
