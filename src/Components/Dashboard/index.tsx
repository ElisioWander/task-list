import { FormEvent, useState, ChangeEvent } from "react";
import { Form } from "../Form";
import { Task } from "../Task";
import { EmptyTasks } from "../EmptyTasks";
import { UpdateTaskModal } from "../UpdateTaskModal";

import styles from "./Dashboard.module.scss";
import { useModal } from "../../Context/ModalContext";

type Task = {
  id: number;
  name: string;
  isChecked: boolean;
};

const tasksInLocalstorage = JSON.parse(localStorage.getItem("tasks") as any);

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(tasksInLocalstorage || []);
  const [newTaksValue, setNewTaskValue] = useState('');

  const { handleCloseModal } = useModal()

  function handleGetInputText(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    setNewTaskValue(inputValue);

    event.currentTarget.setCustomValidity("");
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const taskId = Math.random();

    const createdTask = {
      id: taskId,
      name: newTaksValue,
      isChecked: false,
    };

    setTasks((state) => [...state, createdTask]);
    setNewTaskValue("");

    const tasksPlusCreatedTask = [...tasks, createdTask];
    localStorage.setItem("tasks", JSON.stringify(tasksPlusCreatedTask));
  }

  function handleUpdateTask(taskId: number, editTaskValue: string) {
    const currentTasks = [...tasks]
    
    for(let i in currentTasks) {
      if(currentTasks[i].id === taskId) {
        currentTasks[i].name = editTaskValue
      }
    }

    const updatedTasks = currentTasks

    setTasks([...updatedTasks])
    handleCloseModal()

    localStorage.setItem('tasks', JSON.stringify([...updatedTasks]))
  }

  function handleDeleteTask(taskId: number) {
    const tasksWithoutDeletedTask = tasks.filter(
      (allTasks) => allTasks.id !== taskId
    );
    setTasks(tasksWithoutDeletedTask);

    localStorage.setItem("tasks", JSON.stringify(tasksWithoutDeletedTask));
  }

  function handleGetCompletedTasks(completedTaskId: number) {
    const currentTasks = [...tasks];

    for (let i in currentTasks) {
      if (currentTasks[i].id === completedTaskId) {
        currentTasks[i].isChecked = true;
      }
    }

    setTasks([...currentTasks]);

    localStorage.setItem("tasks", JSON.stringify([...currentTasks]));
  }

  const completedTasks = tasks?.filter((task) => task.isChecked === true);

  const parsedTasks = tasks.map((task) => {
    return (
      <Task
        key={task.id}
        task={task}
        onGetCompletedTasks={handleGetCompletedTasks}
        onDeleteTask={handleDeleteTask}
      />
    );
  });

  return (
    <>
      <div className={styles.container}>
        <Form
          newTaskValue={newTaksValue}
          onCreateNewTask={handleCreateNewTask}
          onGetInputText={handleGetInputText}
        />

        <main className={styles.tasksContainer}>
          <div className={styles.headerTasks}>
            <div>
              <p>Tarefas criadas</p>
              <span>{tasks.length}</span>
            </div>
            <div>
              <p>Concluidas</p>
              <span>
                {completedTasks.length} de {tasks.length}
              </span>
            </div>
          </div>

          <section className={styles.tasks}>
            {tasks.length === 0 ? <EmptyTasks /> : parsedTasks}
          </section>
        </main>
      </div>

      <UpdateTaskModal onUpdateTask={handleUpdateTask} />
    </>
  );
}
