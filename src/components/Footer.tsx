import Link from "next/link";
import Logo from "./Logo";

// Custom SVG Icons for Social Media (as Lucide v1.8.0 lacks brand icons)
const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
);

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
);

const WebsiteIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);

const toolLinks = [
  { label: "Merge PDF", href: "/merge-pdf" },
  { label: "Split PDF", href: "/split-pdf" },
  { label: "Compress PDF", href: "/compress-pdf" },
  { label: "Rotate PDF", href: "/rotate-pdf" },
  { label: "Watermark PDF", href: "/watermark-pdf" },
  { label: "Image to PDF", href: "/image-to-pdf" },
  { label: "PDF to Image", href: "/pdf-to-image" },
  { label: "Image Converter", href: "/image-converter" },
];

const companyLinks = [
  { label: "About", href: "https://msvglobaltech.com" },
  { label: "Contact", href: "https://msvglobaltech.com" },
  { label: "Privacy Policy", href: "https://msvglobaltech.com" },
  { label: "Terms of Service", href: "https://msvglobaltech.com" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-950 to-slate-900 text-white pt-12 pb-8 mt-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Logo size={32} />
              <div>
                <span className="font-bold text-[16px] text-white block leading-tight">Convertifyz</span>
                <span className="text-[10px] font-medium text-slate-400 tracking-widest uppercase block">Quick Action Suite</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Fast, secure, and professional tools for PDF and image processing. No signup, no storage, just results.
            </p>
          </div>

          {/* Column 2: PDF Tools */}
          <div>
            <h3 className="text-[11px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-5">PDF Tools</h3>
            <ul className="space-y-3">
              {toolLinks.slice(0, 5).map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="text-xs text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Image Tools */}
          <div>
            <h3 className="text-[11px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-5">Image Tools</h3>
            <ul className="space-y-3">
              {toolLinks.slice(5).map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="text-xs text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-[11px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-5">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-xs text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Socials */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} Convertifyz</p>
            <span className="hidden sm:inline text-white/10">•</span>
            <div className="flex items-center gap-1.5">
              <span>Built with</span>
              <span className="text-pink-500/80 animate-pulse text-[14px]">♥</span>
              <span>for users worldwide</span>
            </div>
          </div>

          {/* Socials - Simple and discrete */}
          <div className="flex items-center gap-4">
            {[
              { icon: <LinkedInIcon size={16} />, href: "https://www.linkedin.com/company/msvglobaltech/", label: "LinkedIn" },
              { icon: <InstagramIcon size={16} />, href: "https://www.instagram.com/msvglobaltech?igsh=MWRjdHR3bTYwYjVmbg==", label: "Instagram" },
              { icon: <YoutubeIcon size={16} />, href: "https://youtube.com/@msvglobaltech?si=JnMI0wRIM9KexCMx", label: "YouTube" },
              { icon: <TwitterIcon size={16} />, href: "https://x.com/msvglobaltech", label: "Twitter" },
              { icon: <WebsiteIcon size={16} />, href: "https://msvglobaltech.com", label: "Website" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-slate-500 hover:text-white transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
