import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/taskSlice";

const EditTask = memo(({ isOpen, onClose, task, onTaskChange }) => {
  const dispatch = useDispatch();

  if (!isOpen || !task) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask(task));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="edit-task-title"
              name="editTaskTitle"
              value={task.title}
              onChange={(e) => onTaskChange({ ...task, title: e.target.value })}
              className="task-input"
            />
          </div>
          <div className="form-group">
            <select
              value={task.priority}
              onChange={(e) =>
                onTaskChange({ ...task, priority: e.target.value })
              }
              className="task-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="button">
              Cancel
            </button>
            <button type="submit" className="button primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default EditTask;
