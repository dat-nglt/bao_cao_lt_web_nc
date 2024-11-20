import axios from 'axios';

const getAllNews = async (type, search) => {
    const response = await axios.get(`http://localhost:3001/api/v1/tin-tuc?type=${type}&title=${search}`);
    return response.data; 
};

export default { getAllNews };