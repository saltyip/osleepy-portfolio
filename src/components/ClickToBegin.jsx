import { useEffect, useState } from 'react';
import { initAudio } from '../utils/sfx';

export default function ClickToBegin({ onStart }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);

    // Explicitly initialize Web Audio Context upon user gesture
    initAudio();

    // Slight stylistic pause before unmounting to hand off to the intro sequence
    setTimeout(() => {
      onStart();
    }, 400);
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-[20000] bg-[#0a0a14] flex items-center justify-center cursor-pointer transition-opacity duration-300"
      style={{ opacity: clicked ? 0 : 1 }}
    >
      <div className="font-mono text-sm text-subtext0 animate-pulse tracking-widest lowercase">
        [ click anywhere to begin ]
      </div>
    </div>
  );
}
