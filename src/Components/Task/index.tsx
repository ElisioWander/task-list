import { Trash } from "phosphor-react";
import { memo, useState } from "react";
import { useModal } from "../../Context/ModalContext";
import { ChackBox } from "../CheckBox";

import styles from "./Task.module.scss";

type Task = {
  id: number;
  name: string;
  isChecked: boolean;
};

interface TaskProps {
  task: Task;
  onGetCompletedTasks: (completedTaskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

function TaskComponent({
  task,
  onDeleteTask,
  onGetCompletedTasks,
}: TaskProps) {
  const [isTaskCompleted, setIsTaskCompleted] = useState(task.isChecked);
  const { handleOpenModal, handleGetTaskId } = useModal();

  function handleActiveCheckbox() {
    if (task.isChecked !== true) setIsTaskCompleted(true);

    onGetCompletedTasks(task.id);
  }

  const taskIncompleted = (
    <p onClick={handleOpenModal} >{task.name}</p>
  )

  const taskWasCompleted = (
    <p className={styles.isChecked}>{task.name}</p>
  )

  return (
    <div
      className={styles.task}
      onClick={() => handleGetTaskId(task.id)}
    >
      <ChackBox
        onActiveCheckbox={handleActiveCheckbox}
        isTaskCompleted={isTaskCompleted}
      />
      
      { isTaskCompleted ? taskWasCompleted : taskIncompleted }

      <button onClick={() => onDeleteTask(task.id)}>
        <Trash size={14} />
      </button>
    </div>
  );
}

export const Task = memo(TaskComponent)
