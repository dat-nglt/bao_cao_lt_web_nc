import React from "react";
import CategoryBook from "./CategoryBook";
import bookService from "../services/bookService";
import Pagination from "./Pagination";
import { Stack } from "@mui/material";
import SearchInput from "../components/SearchInput";
import { useParams } from "react-router-dom";

function CategoryAll(props) {
  const [books, setBooks] = React.useState([]);
  const { id } = useParams();

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
        let bookList;
        if (id) {
          // Fetch books by category if id is present
          bookList = await bookService.getBooksByCategory(id);
        } else {
          // Fetch all books if no category id
          bookList = await bookService.getAllBooks();
        }
        setBooks(bookList);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [id]);

  React.useEffect(() => {
    setCurrentPage(1); 
  }, [id]);

  return (
    <>
      <SearchInput />
      <CategoryBook
        title={id ? "Sách theo danh mục" : "Tất cả sách"}
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
          Hiện không có sách
        </Stack>
      ) : null}
    </>
  );
}
export default CategoryAll;


