import { Divider, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import ContactItem from './ContactItem';

const rentList = [
  {
    title: 'Yêu cầu mở tài khoản độc giả đã bị khóa',
    imageUrl: 'https://icons-for-free.com/iff/png/512/at+contact+email+mail+icon-1320191824009890042.png',
    timeSend: '01/01/2024',
    content: 'Mở ra cho em đi mà em năn ni anh đó anh thủ thư ơi em rất muốn được mượn sách hichic'
  }
];

function Punish(props) {
  const theme = useTheme();
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
        >Phản hồi của tôi</Typography>

        <Divider />

        {
          rentList.map((rentBook, index) => <ContactItem key={index} book={rentBook} />)
        }
      </Stack >
    </Stack >
  );
}

export default Punish;