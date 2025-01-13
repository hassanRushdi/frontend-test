import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/taskSlice";

const TaskFilter = memo(() => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);

  return (
    <select
      id="task-filter"
      name="taskFilter"
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
      className="task-select"
    >
      <option value="all">All Tasks</option>
      <option value="high">High Priority</option>
      <option value="medium">Medium Priority</option>
      <option value="low">Low Priority</option>
    </select>
  );
});

export default TaskFilter;
