import { useState } from "react";
import { FaThumbtack } from "react-icons/fa";

const suggestions = [
  "Plan a birthday party",
  "Organize a team meeting",
  "Start a personal blog",
  "Prepare for a job interview",
  "Launch a new product",
];

const TaskGenerator = () => {
  const [input, setInput] = useState("");
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSuggest = (text: string) => {
    setInput(text);
    generateTasks(text);
  };

  const generateTasks = async (promptText: string) => {
    if (!promptText.trim()) return;
    setLoading(true);
    setGeneratedTasks([]);

    try {
      const res = await fetch("/api/assistant/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Break this into actionable tasks:\n"${promptText}"\nReturn as a bullet list.`,
        }),
      });

      const data = await res.json();
      const tasks = data.response
        .split("\n")
        .map((t: string) => t.replace(/^[-•\d.]\s*/, "").trim())
        .filter(Boolean);

      setGeneratedTasks(tasks);
    } catch {
      setGeneratedTasks(["⚠️ Error generating tasks. Try again."]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => generateTasks(input);

  const handleAddTask = async (title: string) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ title, description: "AI generated task" }),
    });

    if (res.ok) {
      alert(`✅ "${title}" added to your tasks`);
    } else {
      alert("⚠️ Failed to add task.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🧠 Task Generator</h2>

      {/* Prompt input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., Plan a birthday party"
          className="flex-1 px-4 py-2 rounded border border-gray-300"
        />
        <button
          onClick={handleGenerate}
          className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {/* Suggested buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggest(s)}
            className="bg-gray-100 hover:bg-cyan-100 text-sm px-3 py-1 rounded border border-gray-300"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Generated tasks */}
      {/* Generated tasks */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {generatedTasks.slice(0, 4).map((task, idx) => (
          <div
            key={idx}
            className="relative bg-white text-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-[1.01] hover:shadow-lg"
          >
            {/* Pin icon */}
            <div className="absolute -top-3 -right-3 bg-cyan-600 text-white p-1 rounded-full shadow">
              <FaThumbtack size={14} />
            </div>

            {/* Task Content */}
            <p className="font-medium mb-2 pl-5">{task}</p>

            {/* Add to My Tasks */}
            <button
              onClick={() => handleAddTask(task)}
              className="text-sm mt-auto bg-black text-white px-4 py-1 rounded-md shadow hover:opacity-90"
            >
              Add to My Tasks
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskGenerator;
