import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;

    const sectionId = location.hash.slice(1);
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  const handleNavigation = (event, href) => {
    setMobileMenuOpen(false);

    if (location.pathname === "/") return;

    event.preventDefault();
    navigate(`/${href}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#BFD9D5]/95 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "py-3 shadow-lg" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#home"
          onClick={(event) => handleNavigation(event, "#home")}
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
              onClick={(event) => handleNavigation(event, link.href)}
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
            onClick={(event) => handleNavigation(event, "#contact")}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-linear-to-r from-[#ff8493] to-[#ffce9f] hover:shadow-glow-cyan transition-all duration-300"
          >
            Let's Talk
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="md:hidden p-2 text-[#2D394A] hover:text-[#562025]"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="md:hidden border-t border-[#2D394A]/15 px-6 py-6 mt-3 flex flex-col gap-4 bg-[#BFD9D5] shadow-lg"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(event) => handleNavigation(event, link.href)}
              className="text-[#2D394A] hover:text-[#562025] font-medium text-lg"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(event) => handleNavigation(event, "#contact")}
            className="mt-2 text-center py-3 rounded-xl font-semibold text-white bg-linear-to-r from-[#ff8493] to-[#ffce9f]"
          >
            Let's Talk
          </a>
        </nav>
      )}
    </header>
  );
};
