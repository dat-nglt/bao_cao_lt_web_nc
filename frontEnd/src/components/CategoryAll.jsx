import React from "react";
import CategoryBook from "./CategoryBook";
import bookService from "../services/bookService";

function CategoryAll(props) {
  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookAll = await bookService.getAllBooks();
        setBooks(bookAll);
        console.log("Dữ liệu:", bookAll);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
    console.log("Dữ liệu từ API:", books);
  }, []);
  return (
    <div>
      <CategoryBook title={"Danh mục"} bookList={books} isHomePage={false} />
    </div>
  );
}
export default CategoryAll;
