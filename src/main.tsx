/**
 * @fileoverview Main entry point for the TaskFlow React application.
 * This file initializes the React application and sets up the global providers.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './components/App.tsx'
import './styles/index.css'

// Initialize the React application
// React.StrictMode helps identify potential problems in the application during development
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Main application component */}
    <App />

    {/* Global toast notifications provider */}
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000, // Duration in milliseconds
        style: {
          background: '#363636',
          color: '#fff',
        },
      }}
    />
  </React.StrictMode>,
)
