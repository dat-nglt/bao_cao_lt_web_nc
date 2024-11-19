import axios from 'axios'

const getAllNews = async (sort, search) => {
    const response = await axios.get(`http://localhost:3001/api/v1/tin-tuc`);
    return response.data; 
};

export default { getAllNews };