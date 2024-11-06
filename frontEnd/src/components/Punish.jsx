import { Divider, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import PunishItem from './PunishItem';

const rentList = [
  {
    title: 'Đắc nhân tâm',
    imageUrl: 'https://nhasachphuongnam.com/images/detailed/217/dac-nhan-tam-bc.jpg',
    quantity: 2,
    borrowDate: '01/01/2024',
    returnDate: '08/01/2024',
    requestStatus: 'Chờ xét duyệt'
  },
  {
    title: 'Moby-Dick',
    imageUrl: 'https://m.media-amazon.com/images/I/61PBBKyZ1rL._AC_UF1000,1000_QL80_.jpg',
    quantity: 2,
    borrowDate: '01/01/2024',
    returnDate: '08/01/2024',
    requestStatus: 'Chờ xét duyệt'
  },
  {
    title: 'The Lord of the Rings',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6D1xdceTr1qkGNw238JUqvZPVBXwayjCsoaZtT8Ech6CascCfg9h8JEtaJCNU7QUjZhM&usqp=CAU',
    quantity: 2,
    borrowDate: '01/01/2024',
    returnDate: '08/01/2024',
    requestStatus: 'Quá hạn'
  },
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
        >Thông tin phí phạt</Typography>

        <Divider />

        {
          rentList.map((rentBook, index) => <PunishItem key={index} book={rentBook} />)
        }
      </Stack >
    </Stack >
  );
}

export default Punish;