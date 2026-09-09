import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Plus, Pencil, Trash2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { API_BASE_URL, fetchProjects } from "../services/api";
import { AddProjectModal } from "./AddProjectModal";
import { EditProjectModal } from "./EditProjectModal";

const categories = ["All", "Full Stack", "AI / ML", "Automation"];

const getImageUrl = (path) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
};

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const cat = activeCategory === "All" ? "" : activeCategory;
      const res = await fetchProjects(cat);
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [activeCategory]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setIsAddModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDelete = async (e, projectId) => {
    e.stopPropagation();
    e.preventDefault();

    const adminKey = prompt("Enter Admin Passcode to Delete Project:");
    if (!adminKey) return;

    try {
      const formData = new FormData();
      formData.append("admin_key", adminKey);

      const res = await fetch(`${API_BASE_URL}/api/v1/projects/${projectId}`, {
        method: "DELETE",
        body: formData,
      });

      if (res.ok) {
        setProjects((prev) =>
          prev.filter((p) => (p.id || p._id) !== projectId),
        );
      } else {
        const err = await res.json();
        alert(`Delete failed: ${err.detail || "Unauthorized"}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error occurred while deleting project.");
    }
  };

  const handleEdit = (e, project) => {
    e.stopPropagation();
    e.preventDefault();
    setEditingProject(project);
  };

  return (
    <section id="projects" className="py-24 relative bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-3xl md:text-5xl font-bold text-[#B95712]">
              Featured Projects
            </h3>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#B95712] text-white rounded-xl text-sm font-medium hover:bg-[#a04a0e] transition-all shadow-sm"
          >
            <Plus size={16} /> Admin Upload
          </button>
        </div>

        <AddProjectModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onProjectAdded={loadProjects}
        />

        {editingProject && (
          <EditProjectModal
            isOpen={!!editingProject}
            project={editingProject}
            onClose={() => setEditingProject(null)}
            onProjectUpdated={loadProjects}
          />
        )}

        <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#B95712] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-red-600 py-12">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-red-500 py-12">
            No projects found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => {
              const tags = project.technologies || project.tags || [];
              const projectId = project.id || project._id;

              return (
                <motion.div
                  key={projectId || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-white rounded-2xl shadow-m overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer relative"
                >
                  <Link
                    to={`/projects/${projectId}`}
                    className="flex flex-col h-full"
                  >
                    {project.image_url && (
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={getImageUrl(project.image_url)}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono text-[#B95712] px-2.5 py-1 rounded-md bg-[#B95712]/10 border border-[#B95712]/20">
                            {project.category}
                          </span>

                          <div className="flex items-center gap-3 text-gray-600">
                            <button
                              onClick={(e) => handleEdit(e, project)}
                              title="Edit Project"
                              className="p-1 hover:text-[#B95712] transition-colors"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              onClick={(e) => handleDelete(e, projectId)}
                              title="Delete Project"
                              className="p-1 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>

                            {project.github_url && (
                              <a
                                href={project.github_url}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="hover:text-[#B95712] transition-colors"
                              >
                                <FaGithub size={18} />
                              </a>
                            )}
                            {project.live_url && (
                              <a
                                href={project.live_url}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="hover:text-[#B95712] transition-colors"
                              >
                                <ExternalLink size={18} />
                              </a>
                            )}
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-[#B95712] mb-2 group-hover:text-[#B95712] transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-gray-800 text-sm leading-relaxed mb-4 line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-mono text-gray-600 bg-gray-100 px-2.5 py-1 rounded border border-gray-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
