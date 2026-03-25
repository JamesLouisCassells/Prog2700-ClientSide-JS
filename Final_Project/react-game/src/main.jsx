import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
/*
FLOW:
1. User clicks a Cell
2. Cell calls p_onClick()
3. Grid passes row/col into Game
4. Game updates state using setGrid()
5. React re-renders UI automatically
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)