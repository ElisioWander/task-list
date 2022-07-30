import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { ModalContextPrvider } from './Context/ModalContext'
import { TasksProvider } from './Context/TasksContext'

import './styles/global.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TasksProvider>
      <ModalContextPrvider>
        <App />
      </ModalContextPrvider>
    </TasksProvider>
  </React.StrictMode>,
)
