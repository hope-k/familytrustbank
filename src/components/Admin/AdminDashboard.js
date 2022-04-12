import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/Slices/authSlice'


const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const logoutUser = () => {
        dispatch(logout());
        navigate(0)
    }

    const location = useLocation();
    return (
        <div>
            <div className='w-screen bg-transparent container lg:px-[8rem] hidden lg:block fixed top-0 z-50'>
                <div className=' whitespace-nowrap duration-200 bg-slate-100 max-w-full rounded-br-3xl rounded-bl-3xl border border-[#ccc] shadow-xl '>
                    <div className='flex justify-evenly text-gray-600 font-semibold items-center duration-200'>
                        <Link to={'/admin/users'} className={' rounded-md duration-500  p-2 my-1 ' + (location.pathname === '/admin/users' && 'bg-teal-600 text-white  ')}>Users</Link>
                        <Link to={'/admin/transactions'} className={' rounded-md  p-2 my-1 duration-500 ' + (location.pathname === '/admin/transactions' && 'bg-teal-600 text-white ')}>Transactions</Link>
                        <Link to={'/admin/statistics'} className={' rounded-md  p-2 my-1 duration-500 ' + (location.pathname === '/admin/statistics' && 'bg-teal-600 text-white ')}>Statistics</Link>
                        <Link to={'/admin/accounts'} className={' rounded-md  p-2 my-1 duration-500 whitespace-nowrap ' + (location.pathname === '/admin/accounts' && 'bg-teal-600 text-white ')}>User Bank Account</Link>
                        <Link to={'/admin/deposit'} className={' rounded-md  p-2 my-1 duration-500 whitespace-nowrap ' + (location.pathname === '/admin/deposit' && 'bg-teal-600 text-white ')}>Deposit Money</Link>
                        <Link to={'/admin/messages'} className={' rounded-md  p-2 my-1 duration-500 ' + (location.pathname === '/admin/messages' && 'bg-teal-600 text-white ')}>Send Messages</Link>
                        <div onClick={() => logoutUser()} className='text-red-500 cursor-pointer'>Log Out</div>
                    </div>

                </div>
            </div>
            <div className='container max-w-full max-h-full lg:py-[5rem]  lg:px-[10rem]'>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboard