import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AddTransaction from './Components/AddTransaction'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AddTransaction />
  </StrictMode>,
)
