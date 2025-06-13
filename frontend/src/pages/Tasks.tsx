import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import { useState } from "react";

const Tasks = () => {
  const [reload, setReload] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Your Tasks</h2>
      <AddTask onTaskAdded={() => setReload(!reload)} />
      <TaskList key={reload.toString()} />
    </div>
  );
};

export default Tasks;
