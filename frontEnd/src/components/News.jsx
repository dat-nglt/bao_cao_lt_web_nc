import React, { useEffect, useState, createContext } from 'react';
import Pagination from "./Pagination";
import CategoryNews from './CategoryNews';
import newsServices from '../services/newsServices';
import { Stack } from '@mui/material';
import SearchNews from './SearchNews'

export const SearchContext = createContext();
function News(props) {
  const [ listNews, setListNews ] = useState([])
  const [searchType, setSearchType] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  useEffect(() => {
    const getNews = async () => {
        const response = await newsServices.getAllNews();
        setListNews(response); 
    };
    getNews();    
}, [searchType]);
console.log(searchType);
console.log(searchTitle);

  const countNews = listNews.length;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(countNews / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
   <SearchContext.Provider value={{ searchType, setSearchType, searchTitle, setSearchTitle }}>
      <SearchNews/>
      <CategoryNews title={'Tin tức mới'} newsList={listNews} start={startIndex} end={endIndex} isHomePage={false} />
      {(totalPages > 1) ? <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> : null}
      {listNews.length === 0 ? (
        <Stack sx={{ margin: '0 auto', textAlign: 'center', fontSize: '2rem' }}>
          Hiện không có tin tức
        </Stack>
        ) : null}
    </SearchContext.Provider>
    </>
   
  );
}

export default News;