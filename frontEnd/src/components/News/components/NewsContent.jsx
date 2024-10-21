import React from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import { Favorite, Visibility, CalendarToday, ReplyIcon } from "@mui/icons-material";
import styled from "@emotion/styled";

const NewsBox = styled(Box)({
  border: "2px solid #ddd",
  borderRadius: "16px",
  padding: "20px",
  width: "80%", 
  margin: "20px 20px 0",
  backgroundColor: "#fff",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
  display: "flex",
  flexDirection: "column",
});
// const BoxImg = styled(Box)({
//   maxWidth: "100%",
//   textAlign: "center",
// })
// const NewsImage = styled("img")({
//   width: "50%",
//   height: "auto",
//   borderRadius: "16px",
//   marginBottom: "16px",
//   objectFit: "cover",
// });
const BoxImgs = styled(Box)({
  maxWidth: "100%",
  display: "flex", 
  justifyContent: "center",
  alignItems: "end", 
  gap: "16px",
  flexWrap: "wrap",
  marginBottom: "16px",
});
const NewsImage = styled("img")({
  width: "30%",
  height: "auto",
  borderRadius: "16px",
  objectFit: "cover",
});
const NewsImageSingle = styled("img")({
  maxWidth: "80%", 
  maxHeight:'700px',
  borderRadius: "16px",
  objectFit: "cover",
});
const NewsImageCouple = styled("img")({
  width: "45%",
  height: "auto",
  borderRadius: "16px",
  objectFit: "cover",
});

const Title = styled(Typography)({
  fontSize: "28px",
  fontWeight: "700",
  color: "#333",
  marginBottom: "12px",
});

const Description = styled(Typography)({
  fontSize: "16px",
  color: "#555",
  marginBottom: "16px",
  lineHeight: "1.75",
  textAlign: "justify",
});

const IconInfo = styled(Typography)({
  fontSize: "14px",
  color: "#777",
  marginLeft: "4px",
});

const DateText = styled(Typography)({
  fontSize: "14px",
  color: "#999",
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

const IconButtonStyled = styled(IconButton)({
  "&:hover": {
    backgroundColor: "rgba(255, 193, 7, 0.1)",
  },
});




const NewsContent = (props) => {
  const images = props.data.images.length > 2
  ? props.data.images.slice(0, 6).map((image, index) => <NewsImage key={index} src={image.img} alt={image.title} />)
  : props.data.images.length === 2
  ? props.data.images.map((image, index) => <NewsImageCouple key={index} src={image.img} alt={image.title} />)
  : props.data.images.map((image, index) => <NewsImageSingle key={index} src={image.img} alt={image.title} />);

  return (
    <NewsBox onClick={props.onClick}>
      <BoxImgs>
        {images}
      </BoxImgs>

      <Title variant="h5">{props.data.title}</Title>

      <Description variant="body1">{props.data.description}</Description>

      <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="row" alignItems="center">
            <IconButtonStyled aria-label="views" disabled>
              <Visibility style={{ color: "#007BFF" }} />
            </IconButtonStyled>
            <IconInfo>{props.data.views} lượt xem</IconInfo>
          </Stack>
          <Stack direction="row" alignItems="center">
            <IconButtonStyled aria-label="likes" disabled>
              <Favorite style={{ color: "#FF5252" }} />
            </IconButtonStyled>
            <IconInfo>{props.data.likes} lượt thích</IconInfo>
          </Stack>
        </Stack>
        <DateText>
          <CalendarToday fontSize="small" />
          {new Date(props.data.date).toLocaleDateString()}
        </DateText>
      </Stack>
    </NewsBox>
  );
};

export default NewsContent;
