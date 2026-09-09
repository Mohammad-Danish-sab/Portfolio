import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { API_BASE_URL } from "../services/api";

export const EditProjectModal = ({
  isOpen,
  project,
  onClose,
  onProjectUpdated,
}) => {
  const [formData, setFormData] = useState({
    admin_key: import.meta.env.VITE_ADMIN_SECRET_KEY || "",
    title: "",
    description: "",
    category: "Full Stack",
    technologies: "",
    github_url: "",
    live_url: "",
  });
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        admin_key: import.meta.env.VITE_ADMIN_SECRET_KEY || "",
        title: project.title || "",
        description: project.description || "",
        category: project.category || "Full Stack",
        technologies: Array.isArray(project.technologies)
          ? project.technologies.join(", ")
          : project.technologies || "",
        github_url: project.github_url || "",
        live_url: project.live_url || "",
      });
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      const projectId = project.id || project._id;

      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val);
      });

      if (image) {
        data.append("image", image);
      }

      const res = await fetch(`${API_BASE_URL}/api/v1/projects/${projectId}`, {
        method: "PUT",
        body: data,
      });

      if (res.ok) {
        alert("Project updated successfully!");
        onProjectUpdated();
        onClose();
      } else {
        const err = await res.json();
        alert(`Update failed: ${err.detail || "Error updating project"}`);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to submit project updates.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 text-red-500">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-800"
        >
          <X size={20} />
        </button>

        <h3 className="text-2xl font-bold text-[#B95712] mb-4">Edit Project</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Admin Passcode *
            </label>
            <input
              type="password"
              required
              value={formData.admin_key}
              onChange={(e) =>
                setFormData({ ...formData, admin_key: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300 focus:outline-[#B95712]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300 focus:outline-[#B95712]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300 focus:outline-[#B95712]"
            >
              <option value="Full Stack">Full Stack</option>
              <option value="AI / ML">AI / ML</option>
              <option value="Automation">Automation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({ ...formData, technologies: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300 focus:outline-[#B95712]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300 focus:outline-[#B95712]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              value={formData.github_url}
              onChange={(e) =>
                setFormData({ ...formData, github_url: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300 focus:outline-[#B95712]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Live URL
            </label>
            <input
              type="url"
              value={formData.live_url}
              onChange={(e) =>
                setFormData({ ...formData, live_url: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300 focus:outline-[#B95712]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Replace Main Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-xs text-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 bg-[#B95712] text-white rounded-lg text-sm font-medium hover:bg-[#a04a0e] transition-all"
          >
            {submitting ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};
