import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'  // ← Esta línea es crucial

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)