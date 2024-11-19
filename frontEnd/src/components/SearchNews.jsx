import { useTheme } from '@emotion/react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Link } from 'react-router-dom';
import typeNewsServices from '../services/typeNewsServices';
import { SearchContext } from './News'

const SearchNews = (props) => {
  const theme = useTheme();
  const [optionSearch, setOptionSearch] = React.useState('');
  const [listTypeNews, setListTypeNews] = React.useState([]);
  const [valueSearch, setValueSearch] = React.useState('');
  const { searchTerm, setSearchTerm } = React.useContext(SearchContext);

  
  const handleChangeValueSearch = (event) => setValueSearch(event.target.value);

  React.useEffect(() => {
    const getTypeNews = async () => {
        const response = await typeNewsServices.getAllTypeNews();
        setListTypeNews(response);
    };
    getTypeNews();    
},[]);

const handleChangeOptionSearch = (event) => {
  setOptionSearch(event.target.value);
  setSearchTerm(event.target.value);
} 

  return (
    <Box
      width="95%"
      m="10px auto"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: '10px',
      }}
    >
      <FormControl sx={{ width: '150px' }} size="small" variant="standard">
        <InputLabel id="category-select-label">Danh mục</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={optionSearch}
          label="Danh mục"
          onChange={handleChangeOptionSearch}
          sx={{
            paddingLeft: '10px',
            color: theme.text.primary.main,
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: theme.palette.primary.main,
                color: theme.palette.white.main,
                padding: '0',
                "&& .Mui-selected": {
                  bgcolor: theme.palette.white.main,
                  color: theme.palette.primary.main,
                },
              },
            },
          }}
        >
          {listTypeNews.map((item) => (
            <MenuItem key={item.id} value={item.id} sx={{ fontSize: '14px' }}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        value={valueSearch}
        id="search-input"
        label="Nhập từ khóa cần tìm kiếm"
        variant="standard"
        sx={{
          flex: 1,
          '& .MuiInput-input': {
            paddingLeft: '10px',
            color: theme.text.primary.main,
          },
        }}
        onChange={handleChangeValueSearch}
      />

      <Link to={`/tim-kiem?danhmuc=${optionSearch}&tukhoa=${valueSearch}`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" sx={{ fontFamily: 'Arial', textTransform: 'unset' }}>
          <ManageSearchIcon sx={{ mr: '5px' }} />
          Tìm kiếm
        </Button>
      </Link>
    </Box>
  );
};

export default SearchNews;