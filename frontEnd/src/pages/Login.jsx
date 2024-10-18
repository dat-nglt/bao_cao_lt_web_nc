import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Checkbox, FormControlLabel, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function Login(props) {
  const theme = useTheme();

  const [visibilityPassword, setVisibilityPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = () => {

    if (username.trim() === '') {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    if (password.trim() === '') {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >

      <Stack flex={1} bgcolor={theme.palette.white.light} alignItems={'center'} sx={{
        backgroundImage: 'url(https://media.npr.org/assets/img/2023/12/29/gettyimages-925364372-edit_custom-15f489a3ffaa6163f026535ac4705763d4ccb977.jpg?s=1100&c=85&f=jpeg)',
        backgroundRepeat: 'repeat-y',
        backgroundSize: 'cover',
        backgroundPosition: 'right',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

      </Stack >

      <Stack minWidth={'450px'} position={'relative'} >
        <Link to={'/'}>
          <Stack flexDirection={'row'}
            alignItems={'center'}
            gap={'10px'}
            p={'10px 0'}
            justifyContent={'center'} mt={'20px'}>
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
          </Stack>
        </Link>

        <Stack component={'form'} width={'80%'} margin={'50px auto 0'}>

          <Stack width={'75%'} margin={'0 auto'} minHeight={'70px'}>
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError}
              value={username}
              helperText={usernameError ? "Tài khoản không được để trống" : ""}
              id="standard-basic" label="Tài khoản sinh viên" variant="standard" />
          </Stack>
          <Stack width={'75%'} margin={'0 auto'} minHeight={'70px'} position={'relative'}>
            <TextField
              type={visibilityPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              value={password}
              helperText={passwordError ? "Mật khẩu không được để trống" : ""}
              id="standard-basic" label="Mật khẩu" variant="standard" />
            <IconButton
              sx={{
                position: 'absolute',
                right: '10px',
                top: '22px',
                padding: 0,
              }}
              onClick={() => setVisibilityPassword(!visibilityPassword)}
            >
              {visibilityPassword ? (
                <RemoveRedEyeIcon sx={{ fontSize: '20px' }} />
              ) : (
                <VisibilityOffIcon sx={{ fontSize: '20px' }} />
              )}
            </IconButton>
          </Stack>

          <Stack width={'75%'} margin={'0 auto'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <FormControlLabel control={<Checkbox size='small' />}
              label={
                <Typography variant='caption' sx={{ color: theme.palette.primary.main }}>
                  Ghi nhớ đăng nhập
                </Typography>
              } />
            <Typography variant='caption' sx={{ color: theme.palette.primary.main }}>Quên mật khẩu?</Typography>
          </Stack>

          <Button onClick={handleSubmit} variant='contained' sx={{
            width: '75%',
            margin: '20px auto 0',
          }}>Đăng nhập</Button>
        </Stack>
        <Stack position={'absolute'} p={'10px'} bottom={0} left={0} right={0} bgcolor={theme.palette.primary.main} alignItems={'center'}>
          <Typography sx={{ color: theme.palette.white.main, fontWeight: '600' }} variant='subtitle1'>Đại Học Kỹ Thuật - Công Nghệ Cần Thơ</Typography>
          <Typography sx={{ color: theme.palette.white.main }} variant='caption'>Địa chỉ: 256 Nguyễn Văn Cừ, Quận Ninh Kiều, Thành phố Cần Thơ</Typography>
          <Stack flexDirection={'row'} gap={'10px'} mt={'10px'}>
            <Link to={'https://www.facebook.com/CTUT.CT'}><FacebookIcon sx={{
              color: '#ffffff'
            }} /></Link>
            <Link to={'https://www.youtube.com/embed/9aE-jHfyXTw'}><YouTubeIcon sx={{
              color: '#ffffff'
            }} /></Link>
          </Stack>
        </Stack>
      </Stack>
    </Box >
  );
}

export default Login;