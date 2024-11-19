import React from 'react';
import { Box, Typography, Stack, Card, CardContent, IconButton, Grid, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

function AboutUs() {
  return (
    <Box sx={{ width: '95%', margin: '0 auto' }}>
      {/* Title */}
      <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', color: 'primary.main', marginBottom: 4 }}>
        Thông tin liên hệ của nhà trường
      </Typography>

      {/* Contact Info Section */}
      <Grid container spacing={4} justifyContent="center">
        {/* Address */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 3, padding: 3 }}>
            <LocationOnIcon sx={{ fontSize: 40, color: 'primary.main', marginBottom: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Địa chỉ</Typography>
            <Typography variant="body1" color="text.secondary">123 Phố ABC, Quận XYZ, Thành phố Hà Nội</Typography>
          </Card>
        </Grid>

        {/* Phone */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 3, padding: 3 }}>
            <PhoneIcon sx={{ fontSize: 40, color: 'primary.main', marginBottom: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Số điện thoại</Typography>
            <Typography variant="body1" color="text.secondary">(024) 1234 5678</Typography>
          </Card>
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 3, padding: 3 }}>
            <EmailIcon sx={{ fontSize: 40, color: 'primary.main', marginBottom: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Email</Typography>
            <Typography variant="body1" color="text.secondary">info@school.edu.vn</Typography>
          </Card>
        </Grid>

        {/* Website */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 3, padding: 3 }}>
            <LocationOnIcon sx={{ fontSize: 40, color: 'primary.main', marginBottom: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Website</Typography>
            <Typography variant="body1" color="text.secondary">www.school.edu.vn</Typography>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 4 }} />

      {/* Social Links */}
      <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Liên kết mạng xã hội
      </Typography>
        <Stack direction="row" spacing={3} justifyContent="center">
        <IconButton
            color="primary"
            href="https://facebook.com"
            target="_blank"
            sx={{
            '&:hover': {
                backgroundColor: 'transparent', // Giữ nguyên màu bao quanh khi hover
            },
            }}
        >
            <FacebookIcon sx={{ fontSize: 30, color: '#1877F2', '&:hover': { color: '#1558A3' } }} />
        </IconButton>

        <IconButton
            color="primary"
            href="https://instagram.com"
            target="_blank"
            sx={{
            '&:hover': {
                backgroundColor: 'transparent', // Giữ nguyên màu bao quanh khi hover
            },
            }}
        >
            <InstagramIcon sx={{ fontSize: 30, color: '#E4405F', '&:hover': { color: '#9B2C6F' } }} />
        </IconButton>

        <IconButton
            color="primary"
            href="https://twitter.com"
            target="_blank"
            sx={{
            '&:hover': {
                backgroundColor: 'transparent', // Giữ nguyên màu bao quanh khi hover
            },
            }}
        >
            <TwitterIcon sx={{ fontSize: 30, color: '#1DA1F2', '&:hover': { color: '#1991CC' } }} />
        </IconButton>

        <IconButton
            color="primary"
            href="https://linkedin.com"
            target="_blank"
            sx={{
            '&:hover': {
                backgroundColor: 'transparent', // Giữ nguyên màu bao quanh khi hover
            },
            }}
        >
            <LinkedInIcon sx={{ fontSize: 30, color: '#0077B5', '&:hover': { color: '#005A8C' } }} />
        </IconButton>

        <IconButton
            color="primary"
            href="https://youtube.com"
            target="_blank"
            sx={{
            '&:hover': {
                backgroundColor: 'transparent', // Giữ nguyên màu bao quanh khi hover
            },
            }}
        >
            <YouTubeIcon sx={{ fontSize: 30, color: '#FF0000', '&:hover': { color: '#D10000' } }} />
        </IconButton>
        </Stack>


    </Box>
  );
}

export default AboutUs;
