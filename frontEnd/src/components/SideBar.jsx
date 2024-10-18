import React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';

function SideBar(props) {
  const theme = useTheme()
  return (
    <Paper
      sx={{
        width: 230,
        maxWidth: 230,
        mt: '20px',
        color: theme.palette.white.main,
        bgcolor: theme.palette.primary.main,
        position: 'sticky',
        top: '10px',
        display: { xs: 'none', sm: 'none', md: 'block' },
      }}
    >
      <MenuList sx={{ p: 0 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem sx={{ p: '12px 10px' }}>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <HomeIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Trang chủ" sx={{ color: 'inherit' }} />
          </MenuItem>
        </Link>
        <Link to="/tin-tuc" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem sx={{ p: '12px 10px' }}>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <FeedIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Tin tức" sx={{ color: 'inherit' }} />
          </MenuItem>
        </Link>
        <Link to="/sach-moi" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem sx={{ p: '12px 10px' }}>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <AutoStoriesIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Sách mới" sx={{ color: 'inherit' }} />
          </MenuItem>
        </Link>
        <Divider sx={{ bgcolor: theme.palette.white.main }} />
        <Link to="/yeu-thich" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem sx={{ p: '12px 10px' }}>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <FavoriteIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Sách yêu thích" sx={{ color: 'inherit' }} />
          </MenuItem>
        </Link>
      </MenuList>
    </Paper>
  );
}

export default SideBar;