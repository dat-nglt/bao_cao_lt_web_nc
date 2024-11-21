import { Divider, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import PunishItem from './PunishItem';
import { userContext } from './Context';
import fineService from "../services/fineService";
// Dữ liệu mẫu, bạn có thể thay thế bằng dữ liệu từ API
const rentList = [
  {
    title: 'Đắc nhân tâm',
    imageUrl: 'https://nhasachphuongnam.com/images/detailed/217/dac-nhan-tam-bc.jpg',
    quantity: 2,
    borrowDate: '01/01/2024',
    returnDate: '08/01/2024',
    requestStatus: 'Chờ xét duyệt'
  },
  {
    title: 'The Catcher in the Rye',
    imageUrl: 'https://example.com/the-catcher.jpg',
    quantity: 1,
    borrowDate: '15/01/2024',
    returnDate: '22/01/2024',
    requestStatus: 'Đã duyệt'
  }
];

function Punish(props) {
  const theme = useTheme();
  const [fine, setFine] = React.useState([]);
  const { loggedInUser, loginContext, logoutContext } = React.useContext(userContext);

  React.useEffect(() => {
    const getFine = async () => {
      try {
        const response = await fineService.getFines(loggedInUser.userData.id);
        console.log(response);
        
        setFine(response.data);  
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phí phạt:", error);
      }
    };

    getFine(); 
  }, []);

  return (
    <Stack
      sx={{
        width: '100%',
        margin: '10px auto',
      }}
    >
      <Stack
        sx={{
          margin: '0 auto',
          width: '95%',
          borderRadius: '10px',
          padding: '10px 20px',
          boxShadow: theme.boxShadow.main,
        }}
      >
        <Typography
          variant='h6'
          sx={{ color: theme.text.primary.main, fontWeight: 600 }}
        >
          Thông tin phí phạt
        </Typography>

        <Divider />

        {fine.length > 0 ? (
          fine.map((item, index) => (
            <PunishItem key={index} fine={item} />
          ))
        ) : (
          <Typography>Không có phí phạt nào</Typography> 
        )}
      </Stack>
    </Stack>
  );
}

export default Punish;
