import { connectDB } from "../utils/connectDB";
import Task from "../models/Task";
import TaskCard from "../components/TaskCard";

async function loadTasks() {
  connectDB();
  const tasks = await Task.find();
  return tasks;
}

export default async function HomePage() {
  const tasks = await loadTasks();
  return (
    <div className="grid grid-cols-4 gap-3">
      {tasks.map((task) => (
        <div key={task._id}>
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
}
