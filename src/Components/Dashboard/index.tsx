import { FormEvent, useState, ChangeEvent, useCallback } from "react";
import { Form } from "../Form";
import { Task } from "../Task";
import { EmptyTasks } from "../EmptyTasks";
import { UpdateTaskModal } from "../UpdateTaskModal";
import { useModal } from "../../Context/ModalContext";

import styles from "./Dashboard.module.scss";

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

  const handleDeleteTask = useCallback((taskId: number) => {
    const tasksWithoutDeletedTask = tasks.filter(
          (allTasks) => allTasks.id !== taskId
        );
        setTasks(tasksWithoutDeletedTask);
    
        localStorage.setItem("tasks", JSON.stringify(tasksWithoutDeletedTask));
  }, [tasks])

  const handleGetCompletedTasks = useCallback((completedTaskId: number) => {
    const currentTasks = [...tasks];

      for (let i in currentTasks) {
        if (currentTasks[i].id === completedTaskId) {
          currentTasks[i].isChecked = true;
        }
      }
  
      setTasks([...currentTasks]);
  
      localStorage.setItem("tasks", JSON.stringify([...currentTasks]));
  }, [tasks])

  const completedTasks = tasks?.filter((task) => task.isChecked === true);
  const isTasksEmpty = tasks.length === 0

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

          <div className={styles.tasks}>
            {isTasksEmpty 
              ? <EmptyTasks /> 
              : tasks.map(task => (
                <Task
                  key={task.id}
                  task={task}
                  onGetCompletedTasks={handleGetCompletedTasks}
                  onDeleteTask={handleDeleteTask}
                />
              )) }
          </div>
        </main>
      </div>

      <UpdateTaskModal onUpdateTask={handleUpdateTask} />
    </>
  );
}