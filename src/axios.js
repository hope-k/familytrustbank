import axios from 'axios';
const instance = axios.create({ baseURL: 'https://familytrustbank-backend.herokuapp.com' });

export default instance