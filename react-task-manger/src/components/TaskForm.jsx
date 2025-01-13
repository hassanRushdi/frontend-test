import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

const TaskForm = memo(() => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({ title: "", priority: "medium" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    dispatch(
      addTask({
        ...task,
        id: Date.now(),
        completed: false,
      })
    );
    setTask({ title: "", priority: "medium" });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        id="new-task-title"
        name="taskTitle"
        placeholder="Add new task..."
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        className="task-input"
      />
      <select
        id="new-task-priority"
        name="taskPriority"
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
        className="task-select"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <button type="submit" className="button primary">
        Add Task
      </button>
    </form>
  );
});

export default TaskForm;
