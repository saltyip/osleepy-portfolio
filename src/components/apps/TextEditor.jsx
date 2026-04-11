export default function TextEditor() {
  const code = `{
  "profile": {
    "name": "shaarav",
    "alias": "osleepy",
    "role": "backend developer",
    "status": "overoptimizing again at 2am",
    "location": "india / my chair",
    "education": "cs undergrad · 2024-2028"
  },
  "stack": {
    "backend": ["node.js", "express.js", "postgresql", "redis", "bullmq"],
    "tools": ["neovim", "lazyvim", "arch linux", "git", "fish shell"],
    "currently_learning": ["docker", "system design"]
  },
  "projects": [
    "urlshortnercongential",
    "saltydotfiles"
  ],
  "fun_facts": [
    "runs arch btw",
    "tunes systems until the latency hurts to look at",
    "built auth from scratch before using a library",
    "googled my way out of everything",
    "got into backend through osint rabbit holes"
  ],
  "approach": "builds real systems and actually understands why they work",
  "links": {
    "github": "github.com/saltyip",
    "linkedin": "linkedin.com/in/shaaravsh"
  }
}`;

  return (
    <div className="bg-[#1e1e2e] p-6 w-full font-mono text-sm leading-relaxed overflow-hidden flex h-full">
      <div className="text-overlay0 pr-4 border-r border-surface1 text-right select-none opacity-50">
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="pl-6 flex-grow text-text whitespace-pre overflow-auto scrollbar-hide">
        <code className="text-blue">
          {`{
  "profile": {
    "name": "shaarav",
    "alias": "osleepy",
    "role": "backend developer",
    "status": "overoptimizing again at 2am",
    "location": "india / my chair",
    "education": "cs undergrad · 2024-2028"
  },
  "stack": {
    "backend": ["node.js", "express.js", "postgresql", "redis", "bullmq"],
    "tools": ["neovim", "lazyvim", "arch linux", "git", "fish shell"],
    "currently_learning": ["docker", "system design"]
  },
  "projects": [
    "urlshortnercongential",
    "saltydotfiles"
  ],
  "fun_facts": [
    "runs arch btw",
    "tunes systems until the latency hurts to look at",
    "built auth from scratch before using a library",
    "googled my way out of everything",
    "got into backend through osint rabbit holes"
  ],
  "approach": "builds real systems and actually understands why they work",
  "links": {
    "github": "`}
          <a href="https://github.com/saltyip" target="_blank" rel="noopener noreferrer" className="underline hover:brightness-110 cursor-pointer" style={{ color: '#89b4fa' }}>github.com/saltyip</a>
          {`",
    "linkedin": "`}
          <a href="https://linkedin.com/in/shaaravsh" target="_blank" rel="noopener noreferrer" className="underline hover:brightness-110 cursor-pointer" style={{ color: '#89b4fa' }}>linkedin.com/in/shaaravsh</a>
          {`"
  }
}`}
        </code>
      </div>
    </div>
  );
}
