import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { formatCurrencyVN } from '../utils/formatCurrencyVN';

function PunishItem(props) {
  const theme = useTheme()
  return (
    <Stack
      sx={{
        padding: '10px 0',
        gap: '10px',
        position: 'relative',

      }}
    >

      <Stack
        sx={{
          border: `1px solid ${theme.palette.gray.main}`,
          borderRadius: '5px',
          padding: '10px',
          flexDirection: 'row',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          '&:hover': {
            boxShadow: theme.boxShadow.main,
            transform: 'scale(1.01)',
          }
        }}
      >
        <img
          src={props.book.imageUrl}
          alt="hinhanh"
          style={{
            width: '100px',
            aspectRatio: '6 / 9',
            borderRadius: '5px'
          }}
        />
        <Stack
          sx={{
            marginLeft: '15px',
            gap: '5px',
            justifyContent: 'flex-start',
          }}
        >
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Typography
              variant='subtitle2'
              sx={{
                color: theme.text.primary.main
              }}
            >Tên sách:</Typography>
            <Typography
              variant='subtitle2'
              sx={{
                marginLeft: '5px',
                fontWeight: 600,
                color: theme.text.primary.main,
              }}
            >{props.book.title}</Typography>
          </Stack>

          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Typography
              variant='subtitle2'
              sx={{
                color: theme.text.primary.main
              }}
            >Ngày trả dự kiến:</Typography>
            <Typography
              variant='subtitle2'
              sx={{
                marginLeft: '5px',
                fontWeight: 600,
                color: theme.text.primary.main,
              }}
            >{props.book.returnDate}</Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Typography
              variant='subtitle2'
              sx={{
                color: theme.text.primary.main
              }}
            >Số ngày quá hạn:</Typography>
            <Typography
              variant='subtitle2'
              sx={{
                marginLeft: '5px',
                fontWeight: 600,
                color: theme.text.primary.main,
              }}
            >10 ngày</Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Typography
              variant='subtitle2'
              sx={{
                color: theme.text.primary.main
              }}
            >Tổng phí phạt :</Typography>
            <Typography
              variant='subtitle2'
              sx={{
                marginLeft: '5px',
                fontWeight: 600,
                color: theme.palette.secondary.main,
              }}
            >{formatCurrencyVN(10000 * 10)}</Typography>
          </Stack>
        </Stack>
        {/* <Button variant='contained' color="error" size="small"
          sx={{
            position: 'absolute',
            right: '20px',
            bottom: '30px',
          }}
        >Hủy mượn</Button> */}
      </Stack>
    </Stack>
  );
}

export default PunishItem;