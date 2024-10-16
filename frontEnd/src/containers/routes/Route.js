import { createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import Login from '../../components/Login'
import Car from '../../components/Car'
import Hello from '../../components/Hello'

export const router =
  createBrowserRouter([
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
