import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const Authenticated = ({ auth, role }) => {

    if (auth && role === 'user') {
        return <Navigate to={'/account/dashboard'} />
    } else if (auth && role === 'admin') {
        return <Navigate to={'/admin/users'} />
    } else {
        return <Outlet />
    }


}

export default Authenticated