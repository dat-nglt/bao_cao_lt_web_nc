import { Box, Button, Checkbox, FormControlLabel, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

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
    <Box>
      <Stack>
        <Link to={'/'}>
          <Stack flexDirection={'row'}
            alignItems={'center'}
            gap={'10px'}
            p={'10px 0'}
            justifyContent={'center'}
            bgcolor={theme.palette.primary.main}

          >
            <img style={{ width: '70px', height: '70px' }} src="https://cdn.haitrieu.com/wp-content/uploads/2022/12/Artboard-2.png" alt="" />
            <Stack>
              <Typography variant='subtitle2' sx={{
                textTransform: "uppercase",
                fontWeight: 700,
                fontSize: 22,
                color: theme.palette.white.main
              }}>
                Trường Đại học Kỹ thuật - Công nghệ Cần Thơ
              </Typography>
            </Stack>
          </Stack>
        </Link>
      </Stack>
      <Stack flexDirection={'row'}>
        <Stack sx={{
          flex: 1,
          padding: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <img style={{
            display: 'block',
            width: '600px',
            borderRadius: '10px',
            aspectRatio: '9 / 6'
          }} src="https://media.istockphoto.com/id/1066987572/vector/isometric-web-banner-e-learning-online-library-online-concept-landing-page-template-modern.jpg?s=612x612&w=0&k=20&c=cKO710gsRRexoDL_j7fcT8M56N1dIOGAe0iCvJX-5y8=" alt="" />
        </Stack>

        <Stack sx={{
          width: '600px',
          p: '30px 10px',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Stack sx={{
            width: '65%',
            alignItemsc: 'center',
            // border: `3px solid ${theme.palette.primary.main}`,
            borderRadius: '5px',
            p: '30px 5px',
            backgroundColor: '#ecf0f3',
            boxShadow: '13px 13px 20px #cbced1, -13px -13px 20px #fff',
          }}>

            <Typography variant='h6' sx={{
              textAlign: 'center',
              color: theme.palette.primary.main,
              fontWeight: 600,
              textTransform: 'uppercase'
            }}>Đăng nhập hệ thống</Typography>

            <Typography variant='subtitle1' sx={{
              textAlign: 'center',
              color: theme.palette.primary.main,
              fontWeight: 600,
              textTransform: 'uppercase'
            }}>Trung tâm học liệu</Typography>

            <Stack
              sx={{
                width: '75%',
                margin: '30px auto',
              }}
            >
              <Stack sx={{ minHeight: '75px' }}>
                <TextField
                  required
                  variant='standard'
                  label="Tài khoản sinh viên"
                  id="outlined-size-small"
                  size="small"
                  onChange={(e) => setUsername(e.target.value)}
                  error={!!usernameError}
                  value={username}
                  helperText={usernameError ? "Tài khoản không được để trống" : ""}
                />
              </Stack>
              <Stack position={'relative'} sx={{ minHeight: '70px' }}>
                <TextField
                  required
                  variant='standard'
                  type={visibilityPassword ? 'text' : 'password'}
                  label="Mật khẩu"
                  id="outlined-size-small"
                  size="small"
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  value={password}
                  helperText={usernameError ? "Mật khẩu không được để trống" : ""}
                  sx={{
                    '& .MuiInputBase-input': {
                      paddingRight: '35px'
                    }
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: '10px',
                    top: '20px',
                    padding: 0,
                  }}
                  onClick={() => setVisibilityPassword(!visibilityPassword)}
                >
                  {visibilityPassword ? (
                    <RemoveRedEyeIcon sx={{ fontSize: '17px' }} />
                  ) : (
                    <VisibilityOffIcon sx={{ fontSize: '17px' }} />
                  )}
                </IconButton>
              </Stack>

              <Stack width={'100%'} margin={'0 auto'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <FormControlLabel control={<Checkbox size='small' />}
                  label={
                    <Typography variant='caption' sx={{ color: theme.palette.primary.main }}>
                      Ghi nhớ đăng nhập
                    </Typography>
                  } />
                <Link to={'/quen-mat-khau'}>
                  <Typography variant='caption' sx={{ color: theme.palette.primary.main }}>Quên mật khẩu?</Typography>
                </Link>
              </Stack>


              <Button variant='contained'
                onClick={handleSubmit}
                sx={{
                  backgroundColor: theme.palette.orange.main,
                  margin: '0 auto',
                  width: '100%',
                  height: '40px',
                }}>Đăng nhập</Button>
              <Link to={'http://localhost:3001/dang-nhap'}>
                <Button variant='contained'
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    margin: '5px auto 0',
                    width: '100%',
                    height: '40px',
                  }}>Dành cho quản trị viên</Button>              </Link>

            </Stack>
            <Stack flexDirection={'row'} gap={'10px'} mt={'10px'} justifyContent={'center'}
            >
              <Link to={'https://www.facebook.com/CTUT.CT'}><FacebookIcon sx={{
                color: theme.palette.primary.main
              }} /></Link>
              <Link to={'https://www.youtube.com/embed/9aE-jHfyXTw'}><YouTubeIcon sx={{
                color: theme.palette.primary.main,
              }} /></Link>
            </Stack>
          </Stack>
        </Stack>

      </Stack >
    </Box >
  );
}

export default Login;