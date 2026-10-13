import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProjectById, getAssetUrl } from "../services/api";
import { ArrowLeft, ExternalLink, Code2, Layers } from "lucide-react";

export const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await fetchProjectById(id);
        setProject(response.data);
      } catch (err) {
        console.error("Failed to load project:", err);
        setError("Project not found or server error.");
      } finally {
        setLoading(false);
      }
    };
    getProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-medium">
        Loading project details...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-semibold">
          {error || "Project not found"}
        </p>
        <Link
          to="/"
          className="text-[#B95712] underline flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#C6D0C7] py-8 sm:py-12 px-3 sm:px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-[#EFEEE4] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-10 shadow-lg border border-gray-100">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-[#B95712] mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Projects
        </Link>

        {/* Title & Category */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#B95712]">
            {project.title}
          </h1>
          <span className="px-4 py-1.5 bg-[#B95712]/10 text-[#B95712] font-semibold text-xs rounded-full uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              <Code2 size={16} /> GitHub Repository
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#B65950] text-white text-sm font-medium rounded-xl hover:bg-[#a04a0e] transition-colors"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>

        {project.image_url && (
          <div className="rounded-2xl overflow-hidden mb-8 border border-gray-100 shadow-sm">
            <img
              src={getAssetUrl(project.image_url)}
              alt={project.title}
              className="w-full h-64 sm:h-87.5 md:h-112.5 object-cover"
            />
          </div>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-8">
            <h3 className="text-m font-bold text-red-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers size={16} /> Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-10">
          <h3 className="text-m font-bold text-red-500 uppercase tracking-wider mb-3">
            About the Project
          </h3>
          <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {project.screenshots && project.screenshots.length > 0 && (
          <div>
            <h3 className="text-m font-bold text-red-500 uppercase tracking-wider mb-4">
              Project Screenshots
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                >
                  <img
                    src={getAssetUrl(screenshot)}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
