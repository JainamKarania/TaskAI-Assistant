import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Suggestions from "./pages/Suggestions";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import TaskGenerator from "./pages/TaskGenerator";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/generate-tasks" element={<TaskGenerator />} />
      </Route>
    </Routes>
  );
}

export default App;
