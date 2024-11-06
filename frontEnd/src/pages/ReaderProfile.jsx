import React from 'react';
import HeaderPage from '../components/HeaderPage';
import { Box, Stack } from '@mui/material';
import SideBar from '../components/SideBar';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import MoneyIcon from '@mui/icons-material/Money';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Outlet } from 'react-router-dom';

const menuItems = [
  { link: '/ho-so-doc-gia', text: 'Hồ sơ độc giả', icon: <HomeIcon fontSize="medium" /> },
  { link: '/ho-so-doc-gia/lich-su-muon', text: 'Lịch sử mượn sách', icon: <FeedIcon fontSize="medium" /> },
  { link: '/ho-so-doc-gia/phi-phat', text: 'Thông tin phí phạt', icon: <MoneyIcon fontSize="medium" /> },
  { link: '/ho-so-doc-gia/phan-hoi-cua-toi', text: 'Phản hồi của tôi', icon: <AlternateEmailIcon fontSize="medium" /> },
  { link: '/ho-so-doc-gia/cap-nhat-mat-khau', text: 'Cập nhật mật khẩu', icon: <PasswordIcon fontSize="medium" /> },
  { link: '/ho-so-doc-gia/yeu-thich', text: 'Sách yêu thích', icon: <FavoriteIcon fontSize="medium" /> },
  { link: '/ho-so-doc-gia/dang-xuat', text: 'Đăng xuất', icon: <LogoutIcon fontSize="medium" /> },
];



function ReaderProfile(props) {
  return (
    <div>
      <HeaderPage />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          margin: '0 auto',
          width: '90%',
        }}
      >
        <Stack>
          <SideBar menuItems={menuItems} />
        </Stack>
        <Outlet />
      </Box>

    </div >
  );
}

export default ReaderProfile;