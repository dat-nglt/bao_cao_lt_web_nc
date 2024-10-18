import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, FormControl, InputBase, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import React from 'react';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Search(props) {
  const theme = useTheme()
  const [optionSearch, setOptionSearch] = React.useState('');

  const handleChange = (event) => {
    setOptionSearch(event.target.value);
  };

  return (
    <Box width={'90%'}
      m={'5px auto'}
      borderTop={`3px solid ${theme.palette.primary.main}`}
    >
      <Stack>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={optionSearch}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack>
        <Search>
          <SearchIconWrapper>
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </Stack>
      <Stack></Stack>
    </Box>
  );
}

export default Search;