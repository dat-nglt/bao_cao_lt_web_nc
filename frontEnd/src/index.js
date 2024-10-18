import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import theme from './theme'
import { ThemeProvider } from '@mui/material/styles'
import { router } from './routes/Route'
import { RouterProvider } from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root')
)
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
