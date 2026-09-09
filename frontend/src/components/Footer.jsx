import { Code2, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/Mohammad-Danish-sab",
      label: "GitHub Profile",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/mohammad-danish14/",
      label: "LinkedIn Profile",
    },
    {
      icon: FaXTwitter,
      href: "https://x.com/DanishSab05",
      label: "Twitter/X Profile",
    },
  ];

  return (
    <footer className=" bg-[#0E0E0E] text-slate-400">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/60">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-[#e6e5e4] text-slate-950 font-bold shadow-lg shadow-cyan-500/10">
                <Code2 size={20} className="stroke-[2.5]" />
              </div>
              <span className="font-bold text-lg text-[#B95712]">
                CodeWith<span className="text-[#B95712]">Danish</span>
              </span>
            </div>
            <p className="text-m text-slate-400 max-w-sm leading-relaxed">
              Building scalable web applications, sharing insights on modern
              frontend development, and writing clean Code.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1 group w-fit"
                  >
                    {link.name}
                    <ArrowUpRight className="size-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 tracking-wider uppercase">
              Stay Updated
            </h3>
            <p className="text-sm text-slate-400">
              Get notified when I post new articles or release projects.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2 pt-1"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition-colors whitespace-nowrap font-semibold"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} CodeWithDanish. Built with React & FastAPI.</p>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg bg-slate-900/50 border border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
