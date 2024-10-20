import { Box, Grid2, Stack, Typography } from '@mui/material';
import React from 'react';
import BookCard from './BookCard';
import { useTheme } from '@emotion/react';

function Category(props) {
  const theme = useTheme();
  return (
    <Box sx={{
      width: '95%',
      margin: '10px auto'
    }}>
      <Stack sx={{
        bgcolor: theme.palette.primary.main,
        mb: '10px',
        borderRadius: '5px'
      }}>
        {
          props.isSearchPage ?
            <Typography sx={{
              padding: '10px 20px',
              color: theme.palette.white.main,
              textTransform: 'unset',
              fontWeight: 600,
            }}>
              {props.bookList.length} kết quả tìm kiếm dành cho: {props.searchData?.danhMuc} {props.searchData?.tuKhoa}
            </Typography>
            :
            <Typography sx={{
              padding: ' 10px 20px',
              color: theme.palette.white.main,
              textTransform: 'unset',
              fontWeight: 600,
            }}>
              {props.title}
            </Typography>
        }

      </Stack>

      <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 5, sm: 8, md: 12 }} >
        {
          props.isSearchPage ?
            props.bookList.map((book, index) => (
              <Grid2 key={index} size={{ xs: 5, sm: 4, md: 4 }}>
                <BookCard data={book} />
              </Grid2>
            ))
            :
            props.bookList.slice(0, 6).map((book, index) => (
              <Grid2 key={index} size={{ xs: 5, sm: 4, md: 4 }}>
                <BookCard data={book} />
              </Grid2>
            ))
        }

      </Grid2>
    </Box>

  );
}

export default Category;