import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
// import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
