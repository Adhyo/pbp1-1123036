import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { FoodList } from './Menu.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FoodList />
  </StrictMode>,
)
