import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import ReaderProfile from '../pages/ReaderProfile'
import PageNotFound from '../pages/PageNotFound'
import SearchPage from '../pages/SearchPage'

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {
    path: '/ho-so-doc-gia',
    element: <ReaderProfile />
  },
  {
    path: '/dang-nhap',
    element: <Login />
  },
  {
    path: '/tim-kiem',
    element: <SearchPage />
  },
  {
    path: '*',
    element: <PageNotFound />
  }
])
