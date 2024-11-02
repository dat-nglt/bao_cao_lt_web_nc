import React from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import { Favorite, Visibility, CalendarToday, Reply } from "@mui/icons-material";
import styled from "@emotion/styled";

const PageContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
});

const Title = styled(Typography)({
  fontSize: "32px",
  fontWeight: "700",
  color: "#333",
  marginBottom: "20px",
});

const Description = styled(Typography)({
  fontSize: "18px",
  color: "#555",
  marginBottom: "20px",
  lineHeight: "1.75",
  textAlign: "justify",
});

const NewsImage = styled("img")({
  width: "80%",
  height: "auto",
  borderRadius: "16px",
  marginBottom: "20px",
  objectFit: "cover",
});

const DateText = styled(Typography)({
  fontSize: "14px",
  color: "#999",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginBottom: "10px",
});

const IconInfo = styled(Typography)({
  fontSize: "14px",
  color: "#777",
  marginLeft: "4px",
});

const StackStyled = styled(Stack)({
  marginBottom: "20px",
});

const IconButtonStyled = styled(IconButton)({
  "&:hover": {
    backgroundColor: "rgba(255, 193, 7, 0.1)",
  },
});

const NewsDetail = ({ data, onClick }) => {
  return (
    <PageContainer>
      <IconButton
          onClick={onClick}
          sx={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <Reply sx={{ color: '#fff' }} />
      </IconButton>
      <Title variant="h5">{data.title}</Title>
      <NewsImage src={data.images[0].img} alt={data.images[0].title} />
      <Description variant="body1">{data.description}</Description>

      <StackStyled direction="row" justifyContent="space-between" width="80%">
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="row" alignItems="center">
            <IconButtonStyled aria-label="views" disabled>
              <Visibility style={{ color: "#007BFF" }} />
            </IconButtonStyled>
            <IconInfo>{data.views} lượt xem</IconInfo>
          </Stack>
          <Stack direction="row" alignItems="center">
            <IconButtonStyled aria-label="likes" disabled>
              <Favorite style={{ color: "#FF5252" }} />
            </IconButtonStyled>
            <IconInfo>{data.likes} lượt thích</IconInfo>
          </Stack>
        </Stack>
        <DateText>
          <CalendarToday fontSize="small" />
          {new Date(data.date).toLocaleDateString()}
        </DateText>
      </StackStyled>
    </PageContainer>
  );
};

export default NewsDetail;
