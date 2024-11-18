import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, CardMedia, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    publisher: "Charles Scribner's Sons",
    year: 1925,
    description:
      "Day la sach sachs sah hasch ash ash sachs sah hasch ash ash sachs sah hasch ash ash sachs sah hasch ash ash ",
    coverUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPj1vUFsc1tTIjxqbX1bwUxOYFNL8_9KNmOSOfhRCtAu7Bqz68I9ASkfDowE93RWfbDJM&usqp=CAU",
  };

  if (!book) {
    return <div>Không tìm thấy sách.</div>;
  }

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
          image={book.coverUrl}
          alt={book.title}
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
              {book.title}
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
              Tác giả: {book.author}
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
              Thể loại: {book.genre}
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
              Nhà xuát bản: {book.publisher}
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
              Năm xuất bản: {book.year}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Mô tả: {book.description}
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
