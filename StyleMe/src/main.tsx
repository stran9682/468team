import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { FilterComponent } from './OutfitMaker.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilterComponent></FilterComponent>
  </StrictMode>,
)
