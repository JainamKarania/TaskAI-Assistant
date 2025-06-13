import { FaRobot, FaTasks } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">TaskAI Assistant</h1>
      <NavLink to="/" className="flex items-center gap-3 hover:text-cyan-400">
        <FaRobot /> Gemini Assistant
      </NavLink>
      <NavLink to="/tasks" className="flex items-center gap-3 hover:text-cyan-400">
        <FaTasks /> Manage Tasks
      </NavLink>
    </aside>
  );
};

export default Sidebar;
