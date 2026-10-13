import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-14 sm:pt-24 sm:pb-16 overflow-hidden bg-[#faf9f7]"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#DEDBD4] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-100 h-100 bg-[#DEDBD4] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center md:text-left grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5c4134] border border-cyan-500/30 text-[#f5f6fa] text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-[#f5f6fa] animate-pulse" />
            Hello, I'm Danish
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#B85C38] tracking-tight leading-none mb-6">
            FULL STACK <br />
            <span className="bg-[#97A26A] bg-clip-text text-transparent">
              DEVELOPER & AI
            </span>{" "}
            <br />
            ENGINEER
          </h1>

          <p className="text-base sm:text-xl text-[#302016] max-w-xl mb-8 leading-relaxed">
            Passionate about building scalable web applications, intelligent AI
            solutions, and full-stack automation platforms focused on
            performance, clean architecture, and real-world problem solving.
            Exploring AI, Generative AI, backend engineering, and modern
            technologies to create innovative, efficient, and future-ready
            solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-linear-to-r from-[#ff849c] to-[#ffce9f] text-white font-bold flex items-center justify-center gap-2 hover:shadow-glow-cyan transition-all duration-300"
            >
              View My Projects
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#B95712] text-[#f5f6fa] font-semibold hover:text-white hover:border-gray-600 transition-all text-center"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-5"
        >
          <div className="relative rounded-2xl p-1 bg-linear-to-b from-red-100 via-yellow-50 to-transparent">
            <div className="bg-[#494B57] rounded-xl p-4 sm:p-6 border border-gray-800 shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 text-xs text-[#e4e8d1] font-mono">
                  <Terminal size={14} /> portfolio.py
                </div>
              </div>

              <pre className="font-mono text-xs text-gray-300 overflow-x-auto leading-relaxed">
                <code>{`class Developer:
    def __init__(self):
        self.name = "CodeWith_Danish"
        self.role = "Full Stack & AI Engineer"
        self.stack = ["React", "FastAPI", "Python"]
        
    def status(self):
        return "Ready to build innovative systems."

dev = Developer()
print(dev.status())`}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
