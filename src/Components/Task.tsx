import { Trash } from "phosphor-react";
import { ChackBox } from "./CheckBox";

import styles from "./Task.module.scss"

interface TaskProps {
  task: { name: string; id: number };
  onDeleteTask: (taskId: number) => void;
}

export function Task({ task, onDeleteTask }: TaskProps) {
  return (
    <div key={task.id} className={styles.task}>
      <ChackBox />
      <p>{task.name}</p>
      <button onClick={() => onDeleteTask(task.id)}>
        <Trash size={14} />
      </button>
    </div>
  );
}
