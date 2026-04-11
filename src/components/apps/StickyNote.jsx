import { Mail, CodeXml, Users, ExternalLink } from 'lucide-react';

export default function StickyNote() {
  return (
    <div className="bg-yellow p-6 w-full text-crust shadow-inner h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Contact <span className="text-[10px] bg-crust/10 px-1 rounded">ME</span>
        </h2>
        <p className="text-sm font-medium leading-relaxed mb-6 italic border-l-2 border-crust/20 pl-3">
          "Reality is an illusion, the universe is a hologram, buy gold, bye!"
        </p>

        <div className="space-y-4">
          <a href="#" className="flex items-center gap-3 hover:translate-x-1 transition-transform group">
            <Mail size={16} />
            <span className="text-xs font-bold">shaaravvvv@gmail.com</span>
          </a>
          <a
            href="https://github.com/saltyip"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:translate-x-1 transition-transform group"
          >
            <CodeXml size={16} />
            <span className="text-xs font-bold underline" style={{ color: '#89b4fa' }}>github.com/saltyip</span>
            <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#89b4fa' }} />
          </a>
          <a
            href="https://linkedin.com/in/shaaravsh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:translate-x-1 transition-transform group"
          >
            <Users size={16} />
            <span className="text-xs font-bold underline" style={{ color: '#89b4fa' }}>linkedin.com/in/shaaravsh</span>
            <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#89b4fa' }} />
          </a>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-crust/10 text-[10px] font-bold text-center opacity-70">
        MODIFIED: 2026-04-11
      </div>
    </div>
  );
}
