import axios from 'axios';
import { useSelector } from 'react-redux';



const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://familytrustbank-backend.herokuapp.com' : 'http://localhost:5000',
    
});
instance.defaults.withCredentials = true;


export default instance