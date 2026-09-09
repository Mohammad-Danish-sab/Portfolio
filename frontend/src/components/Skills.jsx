import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layout, Server, Cpu, Database, Plus, Trash2, X } from "lucide-react";

import { fetchSkills, createSkill, deleteSkill } from "../services/api";

const defaultCategories = [
  {
    title: "Frontend",
    icon: Layout,
    skills: [
      "React.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "HTML5/CSS3",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      "Python",
      "FastAPI",
      "Node.js",
      "Express.js",
      "REST APIs",
      "SQLAlchemy",
      "Pydantic",
    ],
  },
  {
    title: "AI / Gen AI",
    icon: Cpu,
    skills: ["NumPy", "Pandas", "RAG", "LLM", "LangChain", "LangGraph"],
  },
  {
    title: "Database & Tools",
    icon: Database,
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Docker",
      "Git & GitHub",
      "VS Code",
    ],
  },
];

const categoryIcons = {
  Frontend: Layout,
  Backend: Server,
  "AI / Gen AI": Cpu,
  "Database & Tools": Database,
};


const categoryOrder = [
  "Frontend",
  "Backend",
  "AI / Gen AI",
  "Database & Tools",
];

export const Skills = () => {
  const [skillCategories, setSkillCategories] = useState(defaultCategories);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [adminKey, setAdminKey] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDynamicSkills();
  }, []);

  const loadDynamicSkills = async () => {
    try {
      const response = await fetchSkills();
      const rawSkills = response?.data;

      if (Array.isArray(rawSkills) && rawSkills.length > 0) {
        const groupedMap = rawSkills.reduce((acc, curr) => {
          const cat = curr.category || "Database & Tools";

          if (!acc[cat]) {
            acc[cat] = [];
          }

          acc[cat].push({
            id: curr.id,
            name: curr.name,
          });

          return acc;
        }, {});

        const formattedCategories = Object.keys(groupedMap)
          .sort((a, b) => {
            const ai = categoryOrder.indexOf(a);
            const bi = categoryOrder.indexOf(b);

            if (ai === -1 && bi === -1) return 0;
            if (ai === -1) return 1;
            if (bi === -1) return -1;

            return ai - bi;
          })
          .map((catName) => ({
            title: catName,
            icon: categoryIcons[catName] || Database,
            skills: groupedMap[catName],
          }));

        setSkillCategories(formattedCategories);
      }
    } catch (err) {
      console.warn(
        "Using default static skills because API is unavailable:",
        err,
      );
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();

    if (!name.trim() || !adminKey.trim()) {
      return;
    }

    setLoading(true);

    try {
      await createSkill(
        {
          name: name.trim(),
          category,
        },
        adminKey,
      );

      setName("");
      setAdminKey("");
      setCategory("Frontend");
      setIsModalOpen(false);

      await loadDynamicSkills();
    } catch (err) {
      console.error(err);

      alert("Failed to add skill. Please verify your admin key.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!id) return;

    const key = prompt("Enter Admin Key to delete this skill:");

    if (!key) return;

    try {
      await deleteSkill(id, key);
      await loadDynamicSkills();
    } catch (err) {
      console.error(err);

      alert("Failed to delete skill. Invalid admin key.");
    }
  };

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#faf9f7] py-24"
    >
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#B65950]/5 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#B85C38]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {" "}
        <div className="flex items-center justify-between mb-12">
          {" "}
          <h3 className="text-3xl md:text-5xl font-bold text-[#B95712]">
            Technical Skills{" "}
          </h3>{" "}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#B95712] text-white rounded-xl text-sm font-medium hover:bg-[#a04a0e] transition-all shadow-sm"
          >
            <Plus size={16} /> Add Skill{" "}
          </button>{" "}
        </div>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {skillCategories.map((cat, idx) => {
            const CategoryIcon = cat.icon;

            return (
              <motion.div
                key={cat.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                }}
                className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8"
              >
                <div className="absolute left-0 top-0 h-1 w-full bg-linear-to-r from-[#B65950] to-[#D69A7A] opacity-70" />

                <div className="mb-7 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B65950]/10 text-[#B65950] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#B65950] group-hover:text-white">
                      <CategoryIcon size={23} />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#B65950]">
                        {cat.title}
                      </h3>

                      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                        {cat.skills.length} Technologies
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skillItem, skillIndex) => {
                    const skillName =
                      typeof skillItem === "string"
                        ? skillItem
                        : skillItem.name;

                    const skillId =
                      typeof skillItem === "object" ? skillItem.id : null;

                    return (
                      <motion.div
                        key={`${cat.title}-${skillName}-${skillIndex}`}
                        whileHover={{ scale: 1.05 }}
                        className="group/skill inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-[#faf9f7] px-3.5 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-[#B65950]/30 hover:bg-[#B65950]/5 hover:text-[#B65950]"
                      >
                        <span>{skillName}</span>

                        {skillId && (
                          <button
                            type="button"
                            onClick={() => handleDeleteSkill(skillId)}
                            className="text-gray-400 opacity-0 transition-all duration-200 hover:text-red-500 group-hover/skill:opacity-100"
                            title="Delete skill"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-[#FAF7F8] shadow-2xl"
          >
            <div className="bg-[#B65950] px-6 py-6 text-white">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/10 p-2.5">
                  <Plus size={20} />
                </div>

                <div>
                  <h3 className="text-xl font-bold">Add New Skill</h3>

                  <p className="mt-1 text-sm text-white/70">
                    Add a technology to your portfolio
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleAddSkill} className="space-y-5 p-6 md:p-7">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600">
                  Skill Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. Next.js"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-gray-400 focus:border-[#B65950] focus:ring-4 focus:ring-[#B65950]/10"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition-all focus:border-[#B65950] focus:ring-4 focus:ring-[#B65950]/10"
                >
                  <option value="Frontend">Frontend</option>

                  <option value="Backend">Backend</option>

                  <option value="AI / Gen AI">AI / Gen AI</option>

                  <option value="Database & Tools">Database & Tools</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600">
                  Admin Key
                </label>

                <input
                  type="password"
                  placeholder="Enter secret admin key"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-gray-400 focus:border-[#B65950] focus:ring-4 focus:ring-[#B65950]/10"
                  required
                />
              </div>

              <div className="flex gap-3 border-t border-gray-200 pt-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-[#B65950] px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#a44e46] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Skill"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};
