import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from "./store/store.js"
import { Provider } from "react-redux"
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
