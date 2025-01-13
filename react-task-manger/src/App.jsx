import { useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";

const TaskForm = lazy(() => import("./components/TaskForm"));
const TaskFilter = lazy(() => import("./components/TaskFilter"));
const TaskItem = lazy(() => import("./components/TaskItem"));
const EditTask = lazy(() => import("./components/EditTask"));

function App() {
  const [editingTask, setEditingTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.priority === filter;
  });

  return (
    <div className="task-manager">
      <div className="task-container">
        <h1>Task Manager</h1>

        <Suspense fallback={<div>Loading Task Form...</div>}>
          <TaskForm />
        </Suspense>

        <div className="filter-container">
          <Suspense fallback={<div>Loading Task Filter...</div>}>
            <TaskFilter />
          </Suspense>
        </div>

        <div className="task-list">
          {filteredTasks.map((task) => (
            <Suspense key={task.id} fallback={<div>Loading Task Item...</div>}>
              <TaskItem
                task={task}
                onEdit={(task) => {
                  setEditingTask(task);
                  setIsDialogOpen(true);
                }}
              />
            </Suspense>
          ))}
        </div>
      </div>

      <Suspense fallback={<div>Loading Edit Task...</div>}>
        <EditTask
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          task={editingTask}
          onTaskChange={setEditingTask}
        />
      </Suspense>
    </div>
  );
}

export default App;
