import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import ReaderProfile from '../pages/ReaderProfile'

export const router =
  createBrowserRouter([
    { path: '/', element: <Home /> },
    {
      path: '/profile',
      element: <ReaderProfile />
    },
    {
      path: '/dang-nhap',
      element: <Login />
    },
    {
      path: '*',
      element: (
        <div>
          Không tìm thấy web theo yêu
          cầu
        </div>
      )
    }
  ])
