import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App,{ AppName}  from './App.jsx'
import Page2 from './Page2.jsx'   


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppName /> 
    <App />
    <Page2 /> 
  </StrictMode>,
)
