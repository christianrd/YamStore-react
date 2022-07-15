import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from 'react-router-dom'
import { StoreProvider } from './app/context/StoreContext'
import App from './app/layout/App'
import './app/layout/styles.css'

export const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router history={history}>
    <React.StrictMode>
      <StoreProvider>
        <App />
      </StoreProvider>
    </React.StrictMode>
  </Router>
)
