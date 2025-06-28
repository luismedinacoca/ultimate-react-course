import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./style.css";
import App from './app-memo';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
