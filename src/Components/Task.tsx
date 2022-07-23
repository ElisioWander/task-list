import { Trash } from "phosphor-react";
import { useState } from "react";
import { ChackBox } from "./CheckBox";

import styles from "./Task.module.scss";

type Task = {
  id: number;
  name: string;
  isChecked: boolean;
};

interface TaskProps {
  task: Task;
  onDeleteTask: (taskId: number) => void;
  onGetCompletedTasks: (completedTaskId: number) => void;
}

export function Task({ task, onDeleteTask, onGetCompletedTasks }: TaskProps) {
  const [isTaskCompleted, setIsTaskCompleted] = useState(task.isChecked);

  function handleActiveCheckbox() {
    if(task.isChecked !== true) setIsTaskCompleted(true);

    onGetCompletedTasks(task.id);
  }

  return (
    <div key={task.id} className={styles.task}>
      <ChackBox onActiveCheckbox={handleActiveCheckbox} isTaskCompleted={isTaskCompleted} />
      <p className={`${isTaskCompleted && styles.isChecked}`} >{task.name}</p>
      <button onClick={() => onDeleteTask(task.id)}>
        <Trash size={14} />
      </button>
    </div>
  );
}
