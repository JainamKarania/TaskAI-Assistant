import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import GeminiChat from "../components/GeminiChat";


const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar at the top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Main Content Below Navbar */}
      <div className="flex flex-1 pt-[48px]"> {/* pt = height of navbar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 p-4 bg-gray-50 min-h-[calc(100vh-56px)]">
          <Outlet />
          <GeminiChat />
        </main>
      </div>
    </div>
  );
};

export default Layout;
