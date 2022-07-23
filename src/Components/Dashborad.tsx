import { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { Form } from "./Form";
import { Task } from "./Task";
import { EmptyTasks } from "./EmptyTasks";

import styles from "./Dashboard.module.scss";

type Task = {
  id: number;
  name: string;
  isChecked: boolean;
};

const tasksInLocalstorage = JSON.parse(localStorage.getItem('tasks') as any)

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(tasksInLocalstorage || []);
  const [newTaks, setNewTask] = useState("");

  function handleGetInputText(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    setNewTask(inputValue);

    event.currentTarget.setCustomValidity("");
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const taskId = Math.random();

    const createdTask = {
      id: taskId,
      name: newTaks,
      isChecked: false,
    };

    setTasks((state) => [...state, createdTask]);
    setNewTask("");

    const sendTasksToLocalstorage = [...tasks, createdTask]
    localStorage.setItem('tasks', JSON.stringify(sendTasksToLocalstorage))
  }

  function handleDeleteTask(taskId: number) {
    setTasks(tasks.filter((allTasks) => allTasks.id !== taskId));
  }

  function handleGetCompletedTasks(checkedTaskId: number) {
    const arrayTasks = [...tasks];

    for (let i in arrayTasks) {
      if (arrayTasks[i].id === checkedTaskId) {
        arrayTasks[i].isChecked = true;
      }
    }

    setTasks([...arrayTasks]);
  }

  const completedTasks = tasks?.filter((task) => task.isChecked === true);

  const parsedTasks = tasks.map(task => {
    return (
      <Task
        key={task.id}
        task={task}
        onDeleteTask={handleDeleteTask}
        onGetCompletedTasks={handleGetCompletedTasks}
      />
    )
  })

  return (
    <div className={styles.container}>
      <Form
        newTask={newTaks}
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
            <span>{completedTasks.length} de {tasks.length}</span>
          </div>
        </div>

        <section className={styles.tasks}>
          {tasks.length === 0 ? (
            <EmptyTasks />
          ) : (
            parsedTasks
          )}
        </section>
      </main>
    </div>
  );
}
