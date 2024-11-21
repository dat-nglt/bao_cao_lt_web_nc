import axios from 'axios'

const getFines = async (userId) => {
    const response = await axios.get(`http://localhost:3001/api/v1/phi-phat/${userId}`);
    return response.data; 
};
export default { getFines };