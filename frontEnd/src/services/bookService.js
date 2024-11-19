import axios from 'axios'

const getAllBooks = async () => {
    const response = await axios.get(`http://localhost:3001/api/v1/danh-muc/xem-tat-ca`);
    return response.data; 
};

const getBookById = async (id) => {
    const response = await axios.get(`http://localhost:3001/api/v1/chi-tiet-sach/${id}`);
    return response.data; 
};

export default { getAllBooks, getBookById };