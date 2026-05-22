export default function TextEditor() {
  return (
    <div className="bg-[#1e1e2e] p-6 w-full font-mono text-[14px] leading-loose antialiased overflow-hidden flex h-full">
      <div className="text-overlay0 pr-4 border-r border-surface1 text-right select-none opacity-40">
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="pl-6 flex-grow text-text whitespace-pre overflow-auto scrollbar-hide">
        <code className="text-text">
          {`{
  "developer": {
    "name": "shaarav",
    "alias": "osleepy",
    "role": "backend systems engineer",
    "education": "2nd year CS student (B.Tech 2024–2028)",
    "mission": "building highly concurrent, reliable systems that don't fall over under pressure"
  },
  "philosophy": {
    "avoid": ["copy-paste tutorial projects", "shallow templates"],
    "prefer": ["building backend primitives from scratch", "measuring benchmarks in milliseconds"],
    "approach": "tunes systems until the telemetry metrics stop looking ugly"
  },
  "technical_focus": {
    "primary_stack": ["node.js", "postgresql", "redis", "bullmq"],
    "environments": ["arch linux", "neovim / lazyvim", "git / github"],
    "appsec_interests": ["jwt key rotation mechanics", "rate-limiting modules", "session blacklist revocation"]
  },
  "currently_building": {
    "goal": "production-grade backend templates featuring exponential backoffs and distributed cache checks",
    "status": "fully immersed in systems design and network protocols"
  },
  "links": {
    "github": "`}
          <a href="https://github.com/saltyip" target="_blank" rel="noopener noreferrer" className="underline hover:text-mauve cursor-pointer transition-colors" style={{ color: '#89dceb' }}>github.com/saltyip</a>
          {`",
    "linkedin": "`}
          <a href="https://linkedin.com/in/shaaravsh" target="_blank" rel="noopener noreferrer" className="underline hover:text-mauve cursor-pointer transition-colors" style={{ color: '#89dceb' }}>linkedin.com/in/shaaravsh</a>
          {`"
  }
}`}
        </code>
      </div>
    </div>
  );
}
