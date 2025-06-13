import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks/all");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="border p-3 rounded">
            <strong>{task.title}</strong>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
