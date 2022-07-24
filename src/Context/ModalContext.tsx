import { createContext, ReactNode, useContext, useState } from "react";

type ModalContextData = {
  isOpenMdal: boolean;
  taskId: number;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleGetTaskId: (taskId: number) => void;
};

interface ModalContextPrviderProps {
  children: ReactNode;
}

const ModalContext = createContext({} as ModalContextData);

export function ModalContextPrvider({ children }: ModalContextPrviderProps) {
  const [isOpenMdal, setIsOpenModal] = useState(false);
  const [taskId, setTaskId] = useState(0);

  function handleOpenModal() {
    const toggleModal = !isOpenMdal;

    setIsOpenModal(toggleModal);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleGetTaskId(taskId: number) {
    setTaskId(taskId);
  }

  return (
    <ModalContext.Provider
      value={{
        isOpenMdal,
        taskId,
        handleOpenModal,
        handleCloseModal,
        handleGetTaskId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
