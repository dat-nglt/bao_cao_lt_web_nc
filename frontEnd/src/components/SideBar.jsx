import React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

const SideBar = ({ menuItems }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        width: 230,
        maxWidth: 230,
        mt: '10px',
        color: theme.palette.common.white,
        bgcolor: theme.palette.primary.main,
        position: 'sticky',
        top: '10px',
        display: { xs: 'none', sm: 'none', md: 'block' },

      }}
    >
      <MenuList sx={{ p: 0 }}>
        {menuItems.map((item, index) => (
          <Stack key={index} sx={{
            '&:hover': {
              color: theme.palette.yellow.main,
            },
          }}>
            <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem sx={{ p: '12px 10px' }}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: 'inherit' }} />
              </MenuItem>
            </Link>
            {item.divider && <Divider sx={{ bgcolor: theme.palette.common.white }} />}
          </Stack>
        ))}
      </MenuList>
    </Paper>
  );
};

export default SideBar;