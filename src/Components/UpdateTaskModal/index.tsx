import { ChangeEvent, FormEvent, useState } from "react";
import { useModal } from "../../Context/ModalContext";
import styles from "./UpdateTaskModal.module.scss";

interface UpdateTaskModalProps {
  onUpdateTask: (taskId: number, editTaskValue: string) => void;
}

export function UpdateTaskModal({ onUpdateTask }: UpdateTaskModalProps) {
  const [editTaskValue, setEditTaskValue] = useState('')
  const { isOpenMdal, taskId, handleCloseModal } = useModal();

  function handleGetEditInputValue(event: ChangeEvent<HTMLInputElement>) {    
    const inputValue = event.target.value

    setEditTaskValue(inputValue)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    onUpdateTask(taskId, editTaskValue)
  }

  const editTaskValueIsEmpty = editTaskValue.length === 0

  if (isOpenMdal) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <form onSubmit={handleSubmit} className={styles.modalContent}>
            <input 
              type="text"
              name="edit"
              value={editTaskValue}
              placeholder="Editar tarefa"
              onChange={handleGetEditInputValue}
            />
            <div className={styles.buttons}>
              <button type="submit" disabled={editTaskValueIsEmpty} >Editar</button>
              <button type="button" onClick={handleCloseModal} >Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <></>
  }
}
