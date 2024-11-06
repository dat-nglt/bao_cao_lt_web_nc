import { Button, Divider, Stack, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

function UpdatePassword(props) {

  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()



  const theme = useTheme()
  return (
    <Stack
      sx={{
        width: '100%',
        margin: '10px auto',
      }}
    >
      <Stack
        sx={{
          margin: '0 auto',
          minHeight: '334px',
          width: '95%',
          borderRadius: '10px',
          padding: '10px 20px',
          boxShadow: theme.boxShadow.main,
        }}
      >
        <Typography
          variant='h6'
          sx={{ color: theme.text.primary.main, fontWeight: 600 }}
        >Cập nhật mật khẩu</Typography>

        <Divider />

        <Stack
          sx={{
            width: { xs: '70%', md: '40%' },
            margin: '20px auto',
            gap: '30px'
          }}
        >
          <TextField
            required
            variant='filled'
            type='password'
            label="Mật khẩu"
            id="outlined-size-small"
            size="small"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            sx={{
              '& .MuiInputBase-input': {
                paddingRight: '35px'
              }
            }}
          />
          <TextField
            required
            variant='filled'
            type='password'
            label="Mật khẩu mới"
            id="outlined-size-small"
            size="small"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            sx={{
              '& .MuiInputBase-input': {
                paddingRight: '35px'
              }
            }}
          />
          <TextField
            required
            variant='filled'
            type='password'
            label="Nhập lại mật khẩu mới"
            id="outlined-size-small"
            size="small"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            sx={{
              '& .MuiInputBase-input': {
                paddingRight: '35px'
              }
            }}
          />
          <Button
            variant='contained'
            color="success"
          >
            Cập nhật
          </Button>
        </Stack>
      </Stack >
    </Stack >
  );
}

export default UpdatePassword;