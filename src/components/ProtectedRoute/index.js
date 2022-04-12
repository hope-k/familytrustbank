import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoute = ({auth, authLoading, role }) => {
    
    return (!authLoading && auth === true && role === 'user') ? <Outlet/> : <Navigate to={'/sign-in'}/>
}

export default ProtectedRoute