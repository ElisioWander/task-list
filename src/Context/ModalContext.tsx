import { createContext, ReactNode, useContext, useState } from 'react'

type ModalContextData = {
  isOpenMdal: boolean
  handleOpenModal: () => void
  handleCloseModal: () => void
}

interface ModalContextPrviderProps {
  children: ReactNode
}

const ModalContext = createContext({} as ModalContextData)

export function ModalContextPrvider({ children }: ModalContextPrviderProps) {
  const [isOpenMdal, setIsOpenModal] = useState(false)

  function handleOpenModal() {
    const toggleModal = !isOpenMdal

    setIsOpenModal(toggleModal)
  }

  function handleCloseModal() {
    setIsOpenModal(false)
  }

  return (
    <ModalContext.Provider
      value={{
        isOpenMdal,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
