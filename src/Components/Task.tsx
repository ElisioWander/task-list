import { Trash } from "phosphor-react";
import { useState } from "react";
import { ChackBox } from "./CheckBox";

import styles from "./Task.module.scss";

type Task = {
  id: number;
  name: string;
};

interface TaskProps {
  task: Task;
  onDeleteTask: (taskId: number) => void;
  onGetCompletedTasks: (checkedTaskId: number) => void;
}

export function Task({ task, onDeleteTask, onGetCompletedTasks }: TaskProps) {
  const [isChecked, setIsChecked] = useState(false);

  function handleActiveCheckbox() {
    setIsChecked(true);
    onGetCompletedTasks(task.id);
  }

  return (
    <div key={task.id} className={styles.task}>
      <ChackBox onActiveCheckbox={handleActiveCheckbox} isChecked={isChecked} />
      <p className={`${isChecked && styles.isChecked}`} >{task.name}</p>
      <button onClick={() => onDeleteTask(task.id)}>
        <Trash size={14} />
      </button>
    </div>
  );
}
