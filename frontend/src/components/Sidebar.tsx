import {
  FaChartPie,
  FaRobot,
  FaTasks,
  FaCalendarAlt,
  FaLightbulb,
  FaChevronDown,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [openAI, setOpenAI] = useState(true);
  const [openTasks, setOpenTasks] = useState(true);

  const aiRef = useRef<HTMLDivElement>(null);
  const taskRef = useRef<HTMLDivElement>(null);

  // Animate AI Tools section
  useLayoutEffect(() => {
    const el = aiRef.current;
    if (!el) return;

    gsap.to(el, {
      height: openAI ? el.scrollHeight : 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        if (openAI) el.style.height = "auto";
      },
    });

    if (!openAI) el.style.height = `${el.scrollHeight}px`; // prep before collapse
  }, [openAI]);

  // Animate Task Tools section
  useLayoutEffect(() => {
    const el = taskRef.current;
    if (!el) return;

    gsap.to(el, {
      height: openTasks ? el.scrollHeight : 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        if (openTasks) el.style.height = "auto";
      },
    });

    if (!openTasks) el.style.height = `${el.scrollHeight}px`;
  }, [openTasks]);

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-2 rounded hover:text-cyan-400 ${
      isActive ? "bg-gray-800 text-cyan-400" : ""
    }`;

  const sidebarContent = (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">TaskAI Assistant</h1>

      {/* AI Tools Section */}
      <div>
        <button
          onClick={() => setOpenAI(!openAI)}
          className="flex items-center justify-between w-full text-sm font-semibold mb-1"
        >
          <span>🤖 AI Tools</span>
          <span>{openAI ? <FaChevronDown /> : <FaChevronRight />}</span>
        </button>
        <div
          ref={aiRef}
          className="overflow-hidden space-y-1 pl-2"
          style={{ height: openAI ? "auto" : 0 }}
        >
          <NavLink to="/dashboard" className={linkStyle}>
            <FaChartPie /> Dashboard
          </NavLink>
          <NavLink to="/" className={linkStyle}>
            <FaRobot /> Gemini Assistant
          </NavLink>
          <NavLink to="/suggestions" className={linkStyle}>
            <FaLightbulb /> Smart Suggestions
          </NavLink>
        </div>
      </div>

      {/* Task Tools Section */}
      <div>
        <button
          onClick={() => setOpenTasks(!openTasks)}
          className="flex items-center justify-between w-full text-sm font-semibold mb-1"
        >
          <span>📋 Task Tools</span>
          <span>{openTasks ? <FaChevronDown /> : <FaChevronRight />}</span>
        </button>
        <div
          ref={taskRef}
          className="overflow-hidden space-y-1 pl-2"
          style={{ height: openTasks ? "auto" : 0 }}
        >
          <NavLink to="/tasks" className={linkStyle}>
            <FaTasks /> Manage Tasks
          </NavLink>
          <NavLink to="/calendar" className={linkStyle}>
            <FaCalendarAlt /> Task Calendar
          </NavLink>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-gray-900 text-white min-h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <aside className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-white z-40 shadow-lg md:hidden">
          <div className="flex justify-end p-4">
            <button
              className="text-white hover:text-red-400"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes size={20} />
            </button>
          </div>
          {sidebarContent}
        </aside>
      )}
    </>
  );
};

export default Sidebar;
