import React, { useEffect, useState } from 'react';
import HeaderPage from '../components/HeaderPage';
import { Box, IconButton, Stack } from '@mui/material';
import SideBar from '../components/SideBar';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Outlet } from 'react-router-dom';


import FormContact from "../components/FormContact";

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


const menuItems = [
  { link: '/lien-he', text: '', icon: <HomeIcon fontSize="medium" /> },
  { link: '/tin-tuc', text: 'Tin tức', icon: <FeedIcon fontSize="medium" /> },
  { link: '/sach-moi', text: 'Sách mới', icon: <AutoStoriesIcon fontSize="medium" /> },
  { link: '/ho-so-doc-gia/yeu-thich', text: 'Sách yêu thích', icon: <FavoriteIcon fontSize="medium" /> },
];
function Contact(props) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div>
      <HeaderPage />
      {visible && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <ArrowUpwardIcon sx={{ color: '#fff' }} />
        </IconButton>
      )}
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
        <Stack sx={{ width: '100%', }}>
          <Outlet/>
        </Stack>
      </Box>
    </div>
  );
}

export default Contact;