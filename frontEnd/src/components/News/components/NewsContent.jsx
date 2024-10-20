import React from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import { Favorite, Visibility, CalendarToday } from "@mui/icons-material";
import styled from "@emotion/styled";

const NewsBox = styled(Box)({
  border: "2px solid #ddd",
  borderRadius: "16px",
  padding: "20px",
  maxWidth: "100%", // Đảm bảo component chiếm 100% chiều ngang
  margin: "20px 20px 0",
  backgroundColor: "#fff",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
  display: "flex", // Sử dụng flexbox để ảnh và nội dung nằm ngang
  flexDirection: "column", // Ảnh và nội dung nằm dọc, có thể đổi thành row nếu cần nằm ngang
});
const BoxImg = styled(Box)({
  maxWidth: "100%",
  textAlign: "center",
})
const NewsImage = styled("img")({
  width: "50%", // Chiều ngang 100% của phần tử chứa
  height: "auto", // Tự động điều chỉnh chiều cao theo chiều ngang
  borderRadius: "16px",
  marginBottom: "16px", // Khoảng cách phía dưới ảnh
  objectFit: "cover", // Giữ tỉ lệ ảnh mà không bị biến dạng

});

const Title = styled(Typography)({
  fontSize: "28px", // Tăng kích thước font
  fontWeight: "700",
  color: "#333",
  marginBottom: "12px",
});

const Description = styled(Typography)({
  fontSize: "16px",
  color: "#555",
  marginBottom: "16px",
  lineHeight: "1.75",
  textAlign: "justify", // Canh đều văn bản
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
  return (
    <NewsBox>
      {/* Hiển thị ảnh */}
      <BoxImg>
        <NewsImage src={props.data.image} alt={props.data.title} />
      </BoxImg>

      {/* Tiêu đề */}
      <Title variant="h5">{props.data.title}</Title>

      {/* Mô tả */}
      <Description variant="body1">{props.data.description}</Description>

      {/* Thông tin lượt xem và lượt thích */}
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

        {/* Ngày đăng */}
        <DateText>
          <CalendarToday fontSize="small" />
          {new Date(props.data.date).toLocaleDateString()}
        </DateText>
      </Stack>
    </NewsBox>
  );
};

export default NewsContent;
