import { useState } from "react";

const AddTask = ({ onTaskAdded }: { onTaskAdded: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/tasks/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    setTitle("");
    setDescription("");
    onTaskAdded(); // callback to refresh task list
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
