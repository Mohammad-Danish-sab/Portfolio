import { motion } from "framer-motion";
import { Download, Briefcase, Award, Cpu } from "lucide-react";

// Image now served from the public/ folder — no bundler import needed.
// Place your photo at: frontend/public/profile.jpg
const profile = "/profile.jpg";

const stats = [
  {
    label: "Projects Completed",
    value: "20+",
    icon: Award,
  },
  {
    label: "Technologies",
    value: "12+",
    icon: Briefcase,
  },
  {
    label: "Core Skills",
    value: "8+",
    icon: Cpu,
  },
];

export const About = () => {
  return (
    <section id="about" className="relative bg-[#faf9f7] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:col-span-5"
          >
            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-red-400 to-yellow-600 opacity-40 blur transition duration-500 group-hover:opacity-75" />

              <div className="relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 p-2 shadow-2xl">
                <img
                  src={profile}
                  alt="Mohammad Danish - Full Stack Developer"
                  className="h-115 w-full max-w-sm rounded-xl object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/400x420?text=Add+profile.jpg";
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#B95712]">
              About Me
            </h2> */}

            <h3 className="mb-6 text-3xl font-bold text-[#B85C38] md:text-4xl">
              Engineering Intelligent Web Platforms & AI Automations
            </h3>

            <p className="mb-6 leading-relaxed text-[#302016] text-lg">
              I am a Full Stack Developer passionate about building scalable web
              applications, intelligent AI solutions, and full-stack automation
              platforms that solve real-world problems. I focus on creating
              modern, high-performance, and user-centric applications with clean
              architecture and scalable design principles. Currently, I’m
              exploring Artificial Intelligence, Generative AI, backend
              engineering, automation, and scalable system design to build
              innovative, efficient, and future-ready digital solutions.
            </p>

            <p className="mb-8 leading-relaxed text-[#302016] text-lg">
              My focus is on creating modern, high-performance applications
              using React, Python, FastAPI, Node.js, and databases while
              exploring Generative AI, automation, and intelligent systems.
            </p>

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-gray-200 bg-[#97A26A] p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Icon size={25} className="mx-auto mb-2 text-red-500" />

                    <div className="text-2xl font-bold text-[#FFFFF0]">
                      {stat.value}
                    </div>

                    <div className="mt-1 text-xs text-[#e4e8d1]">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-xl bg-linear-to-r from-[#ff849c] to-[#ffce9f] px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:opacity-90"
              >
                Hire Me
              </a>

              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 rounded-xl border border-gray-300 bg-[#B65950] px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:text-cyan-600"
              >
                <Download size={18} />
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
