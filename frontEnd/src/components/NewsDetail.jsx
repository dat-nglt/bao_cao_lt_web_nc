import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, CardMedia, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import bookService from "../services/bookService";

function NewsDetail(props) {
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
        flexDirection: "column",
        mt: 4,
        margin: "10px auto",
      }}
    >
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon sx={{color: 'primary.main'}}/>}
        onClick={handleGoBack}
        sx={{
          alignSelf: "start",
          justifyContent: "flex-end",
          width: "50px",
          mb: 2,
          position: 'absolute',
          top: '148px',
          bgcolor: '#fff',
          margin: '0 10px'
        }}
      ></Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          bgcolor: "primary.main",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.5)",
          borderRadius: '4px 4px 0 0',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{color: "#fff", padding: '10px 0', margin: "0", textTransform: 'uppercase'}}>
          Thông tin sách
        </Typography>
      </Box>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          width: "100%",
          minWidth: 900,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.5)",
          borderRadius: '0 0 4px 4px',
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

export default NewsDetail;
