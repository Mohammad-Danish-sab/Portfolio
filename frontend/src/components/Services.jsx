import { motion } from "framer-motion";
import { Code, Bot, Workflow, Layers } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Full Stack Development",
    description:
      "Building modern, high-performance web applications using React, Tailwind CSS, and FastAPI.",
  },
  {
    icon: Bot,
    title: "Backend",
    description:
      "Building modern, high-performance web applications using Node.js, Express.js, and FastAPI.",
  },
  {
    icon: Workflow,
    title: "AI",
    description:
      "Automating repetitive workflows using Python, custom microservices, and asynchronous tasks.",
  },
  {
    icon: Layers,
    title: "API & Microservices",
    description:
      "Designing secure, scalable, and documented RESTful APIs powered by FastAPI and PostgreSQL.",
  },
];

export const Services = () => {
  return (
    <section
      id="services"
      className="py-16 md:py-24 relative bg-[#faf9f7]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <h3 className="text-3xl md:text-5xl font-bold text-[#B65950]">
            Services & Capabilities
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const ServiceIcon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="relative overflow-hidden bg-white p-6 sm:p-8 rounded-2xl transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Top Border */}
                <div className="absolute left-0 top-0 h-1 w-full bg-linear-to-r from-[#B65950] to-[#D69A7A] opacity-70" />

                <div className="p-4 rounded-xl text-[#B65950] bg-[#B65950]/10 w-fit mb-6 group-hover:scale-110 transition-transform">
                  <ServiceIcon size={26} />
                </div>

                <h4 className="text-xl font-bold text-[#B95712] mb-3">
                  {service.title}
                </h4>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

