import React from 'react';
import HeaderPage from '../components/HeaderPage';
import { Box, Stack } from '@mui/material';
import SideBar from '../components/SideBar';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Outlet } from 'react-router-dom';

const menuItems = [
  { link: '/', text: 'Hồ sơ độc giả', icon: <HomeIcon fontSize="medium" /> },
  { link: '/ho-so-doc-gia/lich-su-muon', text: 'Lịch sử mượn sách', icon: <FeedIcon fontSize="medium" /> },
  { link: '/sach-moi', text: 'Cập nhật mật khẩu', icon: <AutoStoriesIcon fontSize="medium" /> },
  { link: '/yeu-thich', text: 'Sách yêu thích', icon: <FavoriteIcon fontSize="medium" /> },
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