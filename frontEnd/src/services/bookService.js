import axios from 'axios'

const getAllBooks = async () => {
    const response = await axios.get(`http://localhost:3001/api/v1//danh-muc/xem-tat-ca`);
    return response.data; 
};

export default { getAllBooks };