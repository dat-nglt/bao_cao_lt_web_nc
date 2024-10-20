import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import ReaderProfile from '../pages/ReaderProfile'
import PageNotFound from '../pages/PageNotFound'
import SearchPage from '../pages/SearchPage'
import Feed from '../components/Feed'
import Contact from '../pages/Contact'
import Profile from '../components/Profile'
import RentHistory from '../components/RentHistory'
import News from '../components/News'
import FavoritBooks from '../components/FavoritBooks'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Feed />
      },
      {
        path: '/tim-kiem',
        element: <SearchPage />
      },
      {
        path: '/tin-tuc',
        element: <News />
      },
      {
        path: '/sach-yeu-thich',
        element: <FavoritBooks />
      }
    ]
  },
  {
    path: '/ho-so-doc-gia',
    element: <ReaderProfile />,
    children: [
      {
        path: '/ho-so-doc-gia',
        element: <Profile />
      },
      {
        path: '/ho-so-doc-gia/lich-su-muon',
        element: <RentHistory />
      }
    ],
    errorElement: <PageNotFound />
  },
  {
    path: '/lien-he',
    element: <Contact />,
    errorElement: <PageNotFound />
  },
  {
    path: '/dang-nhap',
    element: <Login />,
    errorElement: <PageNotFound />
  },
  {
    path: '*',
    element: <PageNotFound />
  }
])
