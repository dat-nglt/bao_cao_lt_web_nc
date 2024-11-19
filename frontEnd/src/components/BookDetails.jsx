import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, CardMedia, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import bookService from "../services/bookService";

function BookDetails(props) {

  const [book, setBook] = React.useState([]);

  const { id } = useParams();
  
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookByID = await bookService.getBookById(id);
        setBook(bookByID);
        console.log(bookByID);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBook();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        mt: 4,
        gap: '50px'
      }}
    >
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={handleGoBack}
        sx={{ alignSelf: "start",justifyContent: 'flex-end', width: '50px', mb: 2 }}
      ></Button>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 980,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <CardMedia
          variant="outlined"
          component="img"
          sx={{ width: 260, aspectRatio: "6 / 9" }}
          image={book.imgBook}
          alt={book.name}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            p: 4,
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography component="div" variant="h4">
              {book.name}
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
              Tác giả: {book.creatorBook}
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
              Thể loại: {book.categoryBook}
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
              Nhà xuát bản: {book.publisherBook}
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
              Năm xuất bản: {book.dateBook}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Mô tả: {book.desBook}
            </Typography>
          </div>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ alignSelf: "flex-end" }}
          >
            Yêu cầu mượn
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default BookDetails;
