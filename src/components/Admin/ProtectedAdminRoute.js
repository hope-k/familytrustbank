import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


const ProtectedAdminRoute = ({ role, authLoading, auth }) => {

    return ( auth && role === 'admin' ) ? <Outlet /> : <Navigate to='sign-in'/>;
}

export default ProtectedAdminRoute