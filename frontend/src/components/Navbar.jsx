import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3 shadow-lg" : "py-6 bg-[#BFD9D5] "}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2 text-xl font-bold tracking-wider group"
        >
          <div className="p-2 rounded-lg bg-[#e6e5e4] text-black font-extrabold">
            <Code2 size={20} />
          </div>
          <span className="bg-[#B85C38] bg-clip-text text-transparent font-bold text-2xl">
            CodeWith<span className="text-[#B85C38]">Danish</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-m text-[#2D394A] hover:text-[#562025] transition-colors font-medium tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-linear-to-r from-[#ff8493] to-[#ffce9f] hover:shadow-glow-cyan transition-all duration-300"
          >
            Let's Talk
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-gray-800 px-6 py-6 mt-3 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-cyan-400 font-medium text-lg"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center py-3 rounded-xl font-semibold text-white bg-linear-to-r from-cyan-500 to-violet-600"
          >
            Let's Talk
          </a>
        </div>
      )}
    </header>
  );
};
