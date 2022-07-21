import { FormEvent, useState, ChangeEvent } from "react";
import { Form } from "./Form";
import { Task } from "./Task";

import clipBoard from "../assets/Clipboard.svg";
import styles from "./Dashboard.module.scss";

type Tasks = {
  id: number;
  name: string;
};

export function Dashboard() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [newTaks, setNewTask] = useState('');

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
    };

    setTasks((state) => [...state, createdTask]);

    setNewTask("");
  }

  function handleDeleteTask(taskId: number) {
    setTasks(tasks.filter((allTasks) => allTasks.id !== taskId));
  }

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
            <span>0</span>
          </div>
        </div>

        <section className={styles.tasks}>
          {tasks?.map((task) => (
            <Task
              key={task.id}
              task={task}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
