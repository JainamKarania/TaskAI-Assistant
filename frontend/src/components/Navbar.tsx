import {
  FaBell,
  FaCog,
  FaSun,
  FaMoon,
  FaBars,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const navRef = useRef(null);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // Optional: Apply to <html> class if using Tailwind dark mode
    document.documentElement.classList.toggle("dark");
  };

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between shadow-sm z-50"
    >
      {/* Left: Sidebar toggle (mobile) */}
      <div className="md:hidden">
        <button
          onClick={onToggleSidebar}
          className="text-gray-700 dark:text-gray-200 hover:text-cyan-500 transition"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="text-gray-700 dark:text-gray-300 hover:text-yellow-400 transition"
          title="Toggle theme"
        >
          {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        {/* Notifications */}
        <button
          className="text-gray-700 dark:text-gray-300 hover:text-cyan-400 transition"
          title="Notifications"
        >
          <FaBell size={18} />
        </button>

        {/* Settings */}
        <button
          className="text-gray-700 dark:text-gray-300 hover:text-cyan-400 transition"
          title="Settings"
        >
          <FaCog size={18} />
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-semibold text-sm cursor-pointer hover:scale-105 transition"
          title="Profile"
        >
          A
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
