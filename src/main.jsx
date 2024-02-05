import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter as Router } from 'react-router-dom'

// Configure axios to send cookies with requests
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <MantineProvider theme={{}}>
        <Router>
          <App />
        </Router>
      </MantineProvider>
    </AuthProvider>
  </React.StrictMode>
)
