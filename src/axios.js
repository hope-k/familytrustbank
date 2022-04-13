import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';



const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://familytrustbank-backend.herokuapp.com' : 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },

});




instance.defaults.withCredentials = true;


export default instance