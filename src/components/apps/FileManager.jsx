import { useState } from "react";
import {
  Folder,
  ChevronRight,
  FileCode,
  X,
  Code,
  ExternalLink,
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "JWT Redis Auth API",
    tags: ["Node.js", "Express", "JWT", "Redis", "REST API"],
    description:
      "A secure and production-ready REST API featuring JWT access/refresh token rotation, Redis-backed session management, and rate limiting.",
    github: "https://github.com/saltyip/jwt-redis-auth-api",
    demo: "https://saltyip.github.io",
    highlights: [
      "Security: Access & refresh token rotation mechanics with immediate blacklist revocation.",
      "Session Control: Sub-millisecond session checking backed by Redis stores.",
      "Rate Limiting: Distributed rate limit thresholds to prevent DDoS and API abuse."
    ]
  },
  {
    id: 2,
    name: "Email Queue Service",
    tags: ["Node.js", "Express", "BullMQ", "Redis", "PostgreSQL", "Nodemailer"],
    description:
      "A background job queue that handles email delivery asynchronously using BullMQ and Redis. Jobs are queued instantly, processed by a worker with concurrency and automatic retry on failure, and logged to PostgreSQL.",
    github: "https://github.com/saltyip/emailqueue",
    demo: "https://saltyip.github.io",
    highlights: [
      "Distributed queues: Handles heavy payloads asynchronously with BullMQ and Redis.",
      "Reliability: Automatic exponential back-off and retry logic for background workers.",
      "Database Logging: Transactional audit logs stored securely in PostgreSQL."
    ]
  },
  {
    id: 3,
    name: "URL Shortener",
    tags: ["Node.js", "PostgreSQL", "Redis", "JWT"],
    description:
      "A production-style URL shortening service built with Node.js and PostgreSQL. Focuses on reliability, performance, and security rather than just the core shortening logic.",
    github: "https://github.com/saltyip/urlshortnercongential",
    demo: "https://saltyip.github.io",
    highlights: [
      "Efficiency: Custom base-62 encoding algorithms for high-speed hash lookups.",
      "Database Optimization: Structured indexing in PostgreSQL to handle high-read redirect operations.",
      "High Availability: Redis caching layer for instant shortcode resolutions."
    ]
  },
  {
    id: 4,
    name: "Nudge CLI Tool",
    tags: ["Node.js", "Shell", "CLI", "Arch Linux"],
    description:
      "A minimalist CLI reminder and task management tool built in Node.js for CachyOS and Arch Linux. Features natural language time parsing, background process monitoring, and shell integration for instant command-completion notifications.",
    github: "https://github.com/saltyip/nudge",
    demo: "https://saltyip.github.io",
    highlights: [
      "CLI Daemon: Linux background watcher daemon built with zero external runtime dependencies.",
      "Natural Language: High-speed, rule-based text parser translating temporal phrases to cron tasks.",
      "Shell Hooks: Intercepts terminal return status codes to trigger custom desktop notifications."
    ]
  },
  {
    id: 5,
    name: "Dotfiles & Linux Tooling",
    tags: ["Shell", "Lua", "Python", "Neovim"],
    description:
      "Personal dotfiles and configs — fastfetch, fish, helix, kitty, neovim/lazyvim, and vicinae. Configs and wallpapers for a clean osleepy setup.",
    github: "https://github.com/saltyip/saltydotfiles",
    demo: "https://saltyip.github.io",
    highlights: [
      "Modular Configurations: Organized Neovim setups using Lazy.nvim wrapper pipelines.",
      "Automation: Shell scripting environments built with Fastfetch, Fish, and Helix configs.",
      "UX Polish: High-speed desktop setup with tailored tiling windows and custom widgets."
    ]
  },
];

export default function FileManager() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="flex h-full w-full bg-[#1e1e2e]/40 overflow-hidden font-sans antialiased">
      {/* Left List Pane */}
      <div
        className={`${selectedProject ? "w-[40%] border-r border-surface1" : "w-full"} h-full flex flex-col p-4 transition-all duration-300 overflow-y-auto`}
      >
        <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-subtext1 uppercase tracking-widest border-b border-surface1 pb-2 shrink-0 font-mono">
          <span className="opacity-50">root</span>
          <ChevronRight size={10} />
          <span>projects</span>
        </div>

        <div className="space-y-1">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all active:scale-[0.98] ${
                selectedProject?.id === proj.id
                  ? "bg-[#313244]"
                  : "hover:bg-surface0"
              }`}
            >
              <Folder
                size={18}
                className={`${selectedProject?.id === proj.id ? "text-mauve" : "text-blue"} group-hover:scale-110 transition-transform`}
              />
              <span
                className={`text-sm font-semibold truncate ${selectedProject?.id === proj.id ? "text-text" : "text-subtext1"}`}
              >
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

          <h2 className="text-[#cba6f7] text-lg font-medium mb-4 pr-8">
            {selectedProject.name}
          </h2>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {selectedProject.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#313244] text-[#cdd6f4] text-[11px] font-mono px-2 py-0.5 rounded border border-surface1/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex-grow overflow-y-auto pr-2 mb-6 space-y-6">
            <p className="text-[#a6adc8] text-[15px] leading-loose">
              {selectedProject.description}
            </p>

            <div>
              <h3 className="text-[#cba6f7] text-[10px] font-bold uppercase tracking-wider mb-3">
                /* Architectural Highlights */
              </h3>
              <ul className="space-y-2">
                {selectedProject.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-3 text-[14px] text-[#cdd6f4] leading-relaxed">
                    <span className="text-[#cba6f7] select-none shrink-0 font-bold">→</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-3 mt-auto pt-4 border-t border-surface1 shrink-0">
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
