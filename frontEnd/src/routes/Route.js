import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import ReaderProfile from '../pages/ReaderProfile'
import PageNotFound from '../pages/PageNotFound'
import SearchPage from '../pages/SearchPage'
import Feed from '../components/Feed'
import CategoryAll from '../components/CategoryAll'
import BookDetails from '../components/BookDetails'
import Contact from '../pages/Contact'
import Profile from '../components/Profile'
import RentHistory from '../components/RentHistory'
import News from '../components/News'
import FavoritBooks from '../components/FavoritBooks'
import UpdatePassword from '../components/UpdatePassword'
import Punish from '../components/Punish'
import ReaderContact from '../components/ReaderContact'
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
      },
      {
        path: '/danh-muc',
        element: <CategoryAll />
      },
      {
        path: '/chi-tiet-sach', 
        element: <BookDetails /> 
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
      },
      {
        path: '/ho-so-doc-gia/phi-phat',
        element: <Punish />
      },
      {
        path: '/ho-so-doc-gia/phan-hoi-cua-toi',
        element: <ReaderContact />
      },
      {
        path: '/ho-so-doc-gia/cap-nhat-mat-khau',
        element: <UpdatePassword />
      },
      {
        path: '/ho-so-doc-gia/yeu-thich',
        element: <FavoritBooks />
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
