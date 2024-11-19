import React from "react";
import CategoryBook from "./CategoryBook";
import bookService from "../services/bookService";
import Pagination from "./Pagination";
import { Stack } from "@mui/material";
import SearchInput from "../components/SearchInput";

function CategoryAll(props) {
  const [books, setBooks] = React.useState([]);

  const countNews = books.length;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(countNews / itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookAll = await bookService.getAllBooks();
        setBooks(bookAll);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);
  return (
    <>
      <SearchInput />
      <CategoryBook
        title={"Tin tức mới"}
        bookList={books}
        start={startIndex}
        end={endIndex}
        isHomePage={false}
      />
      {totalPages > 1 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : null}
      {books.length === 0 ? (
        <Stack sx={{ margin: "0 auto", textAlign: "center", fontSize: "2rem" }}>
          Hiện không có tin tức
        </Stack>
      ) : null}
    </>
  );
}
export default CategoryAll;
