import { useState } from 'react';
import { Folder, ChevronRight, FileCode, X, Code, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'urlshortnercongential',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'JWT'],
    description: 'A production-style URL shortening service built with Node.js and PostgreSQL. Focuses on reliability, performance, and security rather than just the core shortening logic.',
    github: 'https://github.com/saltyip/urlshortnercongential',
    demo: 'https://saltyip.github.io',
  },
  {
    id: 2,
    name: 'saltydotfiles',
    tags: ['Shell', 'Lua', 'Python', 'Neovim'],
    description: 'Personal dotfiles and configs — fastfetch, fish, helix, kitty, neovim/lazyvim, and vicinae. Configs and wallpapers for a clean osleepy setup.',
    github: 'https://github.com/saltyip/saltydotfiles',
    demo: 'https://saltyip.github.io',
  },
];

export default function FileManager() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="flex h-full w-full bg-[#1e1e2e]/40 overflow-hidden font-mono">
      {/* Left List Pane */}
      <div className={`${selectedProject ? 'w-[40%] border-r border-surface1' : 'w-full'} h-full flex flex-col p-4 transition-all duration-300 overflow-y-auto`}>
        <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-subtext1 uppercase tracking-widest border-b border-surface1 pb-2 shrink-0">
          <span className="opacity-50">root</span>
          <ChevronRight size={10} />
          <span>projects</span>
        </div>

        <div className="space-y-1">
          {projects.map(proj => (
            <div 
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all active:scale-[0.98] ${
                selectedProject?.id === proj.id ? 'bg-[#313244]' : 'hover:bg-surface0'
              }`}
            >
              <Folder size={18} className={`${selectedProject?.id === proj.id ? 'text-mauve' : 'text-blue'} group-hover:scale-110 transition-transform`} />
              <span className={`text-xs font-medium truncate ${selectedProject?.id === proj.id ? 'text-text' : 'text-subtext1'}`}>
                {proj.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Preview Pane */}
      {selectedProject && (
        <div className="w-[60%] h-full bg-[#181825]/60 flex flex-col p-6 animate-in fade-in slide-in-from-right-4 duration-300 relative">
          <button 
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 p-1 hover:bg-[#313244] rounded-md text-subtext1 hover:text-red transition-colors"
          >
            <X size={16} />
          </button>

          <h2 className="text-[#cba6f7] text-lg font-medium mb-4 pr-8">{selectedProject.name}</h2>
          
          <div className="flex flex-wrap gap-1.5 mb-6">
            {selectedProject.tags.map(tag => (
              <span 
                key={tag}
                className="bg-[#313244] text-[#cdd6f4] text-[10px] px-2 py-0.5 rounded border border-surface1/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-[#6c7086] text-[13px] leading-relaxed mb-8 flex-1 overflow-y-auto pr-2">
            {selectedProject.description}
          </p>

          <div className="flex gap-3 mt-auto pt-4 border-t border-surface1">
            <a 
              href={selectedProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#313244] text-[#cdd6f4] hover:text-[#cba6f7] text-xs font-bold rounded-lg transition-all active:scale-95"
            >
              <Code size={14} />
              GitHub
            </a>
            <a 
              href={selectedProject.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#313244] text-[#cdd6f4] hover:text-[#cba6f7] text-xs font-bold rounded-lg transition-all active:scale-95"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
