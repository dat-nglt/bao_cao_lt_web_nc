import { Divider, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

function RentHistory(props) {
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
          width: '95%',
          borderRadius: '10px',
          padding: '10px 20px',
          boxShadow: theme.boxShadow.main,
        }}
      >
        <Typography
          variant='h6'
          sx={{ color: theme.text.primary.main, fontWeight: 600 }}
        >Lịch sử mượn sách</Typography>

        <Divider />

        <Stack
          sx={{
            padding: '10px 0',
            gap: '10px'
          }}
        >


          <Stack
            sx={{
              border: '1px solid #333',
              borderRadius: '10px',
            }}
          ><Typography
            variant='h6'
            sx={{ color: theme.text.primary.main, fontWeight: 600 }}
          >Lịch sử mượn sách</Typography><Typography
            variant='h6'
            sx={{ color: theme.text.primary.main, fontWeight: 600 }}
          >Lịch sử mượn sách</Typography><Typography
            variant='h6'
            sx={{ color: theme.text.primary.main, fontWeight: 600 }}
          >Lịch sử mượn sách</Typography>

          </Stack>


        </Stack>

      </Stack >
    </Stack >
  );
}

export default RentHistory;