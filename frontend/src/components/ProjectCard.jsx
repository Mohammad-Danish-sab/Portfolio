import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { API_BASE_URL } from "../services/api";

export const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/projects/${project.id}`}>
        <img
          src={`${API_BASE_URL}${project.image_url}`}
          alt={project.title}
          className="w-full h-48 object-cover rounded-xl mb-4 cursor-pointer hover:opacity-95 transition-opacity"
        />
      </Link>

      <span className="text-xs font-bold text-[#B95712] uppercase tracking-wider">
        {project.category}
      </span>

      <Link to={`/projects/${project.id}`}>
        <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2 hover:text-[#B95712] transition-colors cursor-pointer">
          {project.title}
        </h3>
      </Link>

      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
        {project.description}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <Link
          to={`/projects/${project.id}`}
          className="text-xs font-semibold text-[#B95712] hover:underline"
        >
          View Full Details →
        </Link>
      </div>
    </div>
  );
};
