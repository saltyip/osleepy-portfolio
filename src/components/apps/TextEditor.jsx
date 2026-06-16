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
    "role": "backend engineer",
    "status": "3rd year CS, Student 2024–2028"
  },
  "stack": {
    "primary": ["go", "node.js", "postgresql", "redis", "docker"],
    "env": ["cachyos", "neovim", "hyprland"]
  },
  "philosophy": {
    "avoid": ["tutorial clones", "shipping before understanding"],
    "default": "build it from scratch first, then use the library",
    "target": "systems that hold up under real load, not just demo concepts"
  }
}`}
        </code>
      </div>
    </div>
  );
}
