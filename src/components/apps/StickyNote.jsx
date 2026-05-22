import { Mail, CodeXml, ExternalLink, Download } from 'lucide-react';

export default function StickyNote() {
  return (
    <div
      className="h-full w-full flex flex-col p-5 gap-5"
      style={{ background: '#f9e2af', color: '#11111b', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Header */}
      <div className="border-b border-[#11111b]/15 pb-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.15em] opacity-50 mb-1">pinned</div>
        <div className="text-lg font-bold leading-tight">shaarav</div>
        <div className="text-sm opacity-60 mt-0.5">2nd year CS · backend systems</div>
      </div>

      {/* Contact Links */}
      <div className="flex flex-col gap-3 flex-1">
        <a
          href="mailto:shaaravvvv@gmail.com"
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#11111b]/10 flex items-center justify-center shrink-0 group-hover:bg-[#11111b]/20 transition-colors">
            <Mail size={15} />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-50">Email</div>
            <div className="text-sm font-semibold leading-tight">shaaravvvv@gmail.com</div>
          </div>
        </a>

        <a
          href="https://github.com/saltyip"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#11111b]/10 flex items-center justify-center shrink-0 group-hover:bg-[#11111b]/20 transition-colors">
            <CodeXml size={15} />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-50">GitHub</div>
            <div className="text-sm font-semibold leading-tight underline underline-offset-2">github.com/saltyip</div>
          </div>
        </a>

        <a
          href="https://linkedin.com/in/shaaravsh"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#11111b]/10 flex items-center justify-center shrink-0 group-hover:bg-[#11111b]/20 transition-colors">
            <ExternalLink size={15} />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-50">LinkedIn</div>
            <div className="text-sm font-semibold leading-tight underline underline-offset-2">in/shaaravsh</div>
          </div>
        </a>

        <a
          href="/resume.pdf"
          download="Shaarav_Resume.pdf"
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#11111b]/10 flex items-center justify-center shrink-0 group-hover:bg-[#11111b]/20 transition-colors">
            <Download size={15} />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-50">Resume</div>
            <div className="text-sm font-semibold leading-tight underline underline-offset-2">Download PDF</div>
          </div>
        </a>
      </div>

      {/* Footer tag */}
      <div
        className="text-[10px] font-bold text-center py-1.5 px-3 rounded-lg border border-[#11111b]/20"
        style={{ background: '#11111b0d', color: '#11111b' }}
      >
        ✦ not interested in tutorial projects
      </div>
    </div>
  );
}
