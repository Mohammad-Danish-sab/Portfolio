import { motion } from "framer-motion";
import { Calendar, Building2 } from "lucide-react";

const experiences = [
  {
    period: "2026 - Present",
    role: "AI Engineering",
    company: "",
    description:
      "Expanding into AI engineering by integrating LLMs, RAG, intelligent automation, and AI-powered features into modern full-stack applications.",
    technologies: [
      "Python",
      "LLMs",
      "RAG",
      "LangChain",
      "FastAPI",
      "React",
      "Docker",
    ],
  },
  {
    period: "2025 - 2026",
    role: "Full Stack Development",
    company: "",
    description:
      "Combining frontend and backend expertise to build complete applications with REST APIs, authentication, database integration, responsive interfaces, and containerized environments.",
    technologies: [
      "React",
      "FastAPI",
      "Node.js",
      "MySQL",
      "MongoDB",
      "SQLAlchemy",
      "Docker",
    ],
  },
  {
    period: "2024 - 2025",
    role: "Backend Development",
    company: "",
    description:
      "Developing server-side applications by building REST APIs, implementing authentication, managing databases, and designing reliable backend systems.",
    technologies: [
      "Node.js",
      "Express.js",
      "Python",
      "FastAPI",
      "MongoDB",
      "MySQL",
    ],
  },
  {
    period: "2024",
    role: "Frontend Development",
    company: "",
    description:
      "Building responsive and interactive web interfaces while learning component-based architecture, modern UI development, and user-focused design.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "Vite",
    ],
  },
  {
    period: "2023 - 2024",
    role: "Programming",
    company: "",
    description:
      "Built a strong foundation in programming and problem-solving through core programming concepts, object-oriented programming, data structures, algorithms, and development fundamentals.",
    technologies: [
      "C++",
      "Data Structures",
      "Algorithms",
      "OOP",
      "Git",
      "GitHub",
    ],
  },
];

export const Experience = () => {
  return (
    <section
      id="experience"
      className="py-24 relative bg-[#faf9f7]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-3xl md:text-5xl font-bold text-[#B95712]">
            Experience Timeline
          </h3>
        </div>

        <div className="max-w-3xl mx-auto relative border-l-2 border-[#97A26A] pl-6 md:pl-8 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role + index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="relative group"
            >
              {/* Timeline Marker */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#B65950] border-2 border-red-400 group-hover:scale-125 transition-transform" />

              {/* Experience Card */}
              <div className="relative overflow-hidden bg-white p-6 rounded-2xl transition-colors">
                
                {/* Top Gradient Border */}
                <div className="absolute left-0 top-0 h-1 w-full bg-linear-to-r from-[#B65950] to-[#D69A7A] opacity-70" />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className="text-xl font-bold text-[#B95712]">
                    {exp.role}
                  </h4>

                  <span className="text-xs font-mono text-red-400 flex items-center gap-1">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                </div>

                <div className="text-sm font-medium text-violet-400 mb-4 flex items-center gap-1.5">
                  <Building2 size={16} />
                  {exp.company}
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#B65950]/10 text-[#B65950]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};