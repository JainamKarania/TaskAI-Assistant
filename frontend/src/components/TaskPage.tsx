import { useState } from "react";
import TaskList from "./TaskList";
import AddTask from "./AddTask";

const TasksPage = () => {
  const [reload, setReload] = useState(false);
  return (
    <>
      <AddTask onTaskAdded={() => setReload(!reload)} />
      <TaskList key={reload.toString()} />
    </>
  );
};

export default TasksPage;
