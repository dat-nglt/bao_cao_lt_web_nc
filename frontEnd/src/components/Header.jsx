import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.white.main,
  padding: '10px',
  fontWeight: 600,

  '&:hover': {
    color: theme.palette.yellow.main,
  },
}));
function Header(props) {
  const theme = useTheme();
  return (
    <Box>
      <Stack flexDirection={'row'}
        width={'90%'}
        alignItems={'center'}
        gap={'10px'}
        m={'0 auto'}
        p={'10px'}
      >
        <img style={{ width: '70px', height: '70px' }} src="https://cdn.haitrieu.com/wp-content/uploads/2022/12/Artboard-2.png" alt="" />
        <Stack>
          <Typography variant='subtitle2' sx={{
            textTransform: "uppercase",
            fontWeight: 600,
            fontSize: 20,
            color: theme.palette.primary.main
          }}>
            Trung tâm học liệu
          </Typography>
          <Typography variant='subtitle2' sx={{
            textTransform: "uppercase",
            fontWeight: 600,
            fontSize: 15,
            color: theme.palette.primary.main
          }}>
            Đại học Kỹ thuật - Công nghệ Cần Thơ
          </Typography>
        </Stack>
      </Stack >
      <Stack sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Stack width={'90%'}
          m={'0 auto'}
          flexDirection={'row'}
          justifyContent={'space-between'}
        >
          <Stack
            flexDirection={'row'}
          >
            <StyledLink>Trang chủ</StyledLink>
            <StyledLink>Tin Tức</StyledLink>
            <StyledLink>Sách Mới</StyledLink>
            <StyledLink>Tài liệu điện tử</StyledLink>
          </Stack>
          <Stack
            flexDirection={'row'}
          >
            {/* <StyledLink>Phiếu mượn</StyledLink> */}
            <StyledLink>Đăng nhập</StyledLink>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Header;