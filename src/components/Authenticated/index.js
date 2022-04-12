import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const Authenticated = ({ auth, role }) => {

    if (auth === true && role === 'user') {
        return <Navigate to={'/account/dashboard'} />
    } else if (auth  === true&& role === 'admin') {
        return <Navigate to={'/admin/users'} />
    } else {
        return <Outlet />
    }


}

export default Authenticated