import React, { memo } from 'react'
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '../redux/taskSlice';

const TaskItem = memo(({ task, onEdit  }) => {
    const dispatch = useDispatch();
    const priorityColors = {
      high: 'bg-red',
      medium: 'bg-yellow',
      low: 'bg-green'
    };
  
    return (
        <div className={`task-item ${priorityColors[task.priority]}`}>
          <div className="task-content">
            <button
              className="icon-button"
              onClick={() => dispatch(toggleTask(task.id))}
            >
              {task.completed ? '✓' : '○'}
            </button>
            <span className={task.completed ? 'completed' : ''}>
              {task.title}
            </span>
          </div>
          <div className="task-actions">
            <button
              className="icon-button"
              onClick={() => onEdit(task)}
            >
              ✎
            </button>
            <button
              className="icon-button"
              onClick={() => dispatch(deleteTask(task.id))}
            >
              ×
            </button>
          </div>
        </div>
      );
    });
    
    export default TaskItem;