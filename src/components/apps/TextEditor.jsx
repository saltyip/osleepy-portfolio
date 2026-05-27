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
    "approach": "iterates until the system actually works, not just runs"
  },
  "technical_focus": {
    "primary_stack": ["node.js", "postgresql", "redis", "bullmq"],
    "environments": ["arch linux (cachyos)", "neovim / lazyvim", "git / github"]
  }`}
        </code>
      </div>
    </div>
  );
}
