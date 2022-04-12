import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MobileNav from '../MobileNav'
import { LocationMarkerIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/Slices/authSlice'
import gsap from 'gsap'

const Header = () => {
    const [profileOpen, setProfileOpen] = useState(false)
    const dispatch = useDispatch()
    const { user, loading, isAuthenticated } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const location = useLocation()
    const [open, setOpen] = useState(false);
    const t1 = useRef()
    const toggleOpen = () => {
        setOpen(!open)
    }
    const toggleProfileOpen = () => {
        setProfileOpen(!profileOpen)
    }
    const logoutUser = () => {
        dispatch(logout());

    }






    return (
        <>
            <MobileNav open={open} toggleOpen={toggleOpen} />


            {loading ? <></> :
                !isAuthenticated &&

                (
                    <div className={'hidden bg-white w-full h-[6rem] lg:flex relative z-20 '}>
                        <div className='container px-[6rem] h-full flex items-center justify-between'>
                            <div className=' flex cursor-pointer'>
                                <Link to='/' className=''>
                                    <div className='w-[18rem] h-full p-2 mr-[2rem] rounded-2xl'>
                                        <img src='https://res.cloudinary.com/hopekumordzie/image/upload/v1647711899/Est._1989-removebg-preview_xhkheb.png' alt='logo' />
                                    </div>
                                </Link>
                            </div>
                            <div className='flex ml-[6rem]'>
                                <div className='bg-slate-100 rounded-full p-4 mr-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4 " viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                                <div >
                                    <div className='text-slate-600 font-bold text-sm'>+1 (971) 234-2131</div>
                                    <div className='text-slate-500 text-sm'>ftbank@support.com</div>
                                </div>
                            </div>
                            <div className='flex mr-[4rem] whitespace-nowrap'>
                                <div className='bg-slate-100 rounded-full p-4 mr-4'>
                                    <LocationMarkerIcon className='w-4' />
                                </div>
                                <div>
                                    <div className='text-slate-600 font-bold text-sm'>388 Greenwich St</div>
                                    <div className='text-slate-500 text-sm'> 388 Greenwich St, New York, NY 10013,</div>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            }
            <div className={'drop-shadow-xl border-b-[.4px] border-slate-500 flex font-base text-base sticky top-0 z-[60] ' + (isAuthenticated ? ' bg-transparent border-none ' : ' bg-[#070707] ') + (isAuthenticated && user?.role?.includes('admin') && ' bg-gray-800 ')}>
                <div className='lg:hidden px-4 md:px-10 flex p-3 justify-between w-full items-center'>
                    <div className='w-[2.5rem]' onClick={() => toggleOpen()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#ccc" >
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" stroke='1' />
                        </svg>
                    </div>
                    <div className=' text-black text-sm bg-transparent p-2 font-semibold flex rounded-lg items-center z-40 relative '>
                        <div className={'text-sm bg-slate-100 p-2 rounded-lg ' + (isAuthenticated && 'text-gray-100 bg-teal-500 rounded-full p-4')}>

                            {
                                !loading &&
                                    isAuthenticated ? (
                                    <div onClick={() => toggleProfileOpen()} >
                                        <h1 className='px-4'>
                                            {user?.firstName}
                                        </h1>

                                        <div className={"flex-col bg-blue-300 absolute bottom-0 mb-[-3.9rem] right-0 rounded rounded-bl-xl rounded-br-xl  z-[70] transition duration-500 ease-in-out  " + (profileOpen ? ' block opacity-100  visible w-fit ' : ' invisible  opacity-0 -translate-y-3 ')}>
                                            <div className='font-normal duration-300 bg-blue-300 rounded'>
                                                <div className='p-2 text-black border-b border-gray-300 hover:bg-blue-300 whitespace-nowrap duration-200'>Request Account Update</div>
                                                <div onClick={() => logoutUser()} className='p-2 text-red-500 hover:bg-blue-300'>Sign Out</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                    : (
                                        <Link to='/sign-in' className='flex'>
                                            Sign On
                                            <div className='ml-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </Link>)
                            }
                        </div>
                        {
                            isAuthenticated &&
                            <div className='ml-2' >
                                <ChevronDownIcon className='w-4 ml-1 text-white' />
                            </div>

                        }
                    </div>



                </div>

                {
                    !isAuthenticated &&

                    <div className=' hidden container lg:flex px-[10rem] items-center text-[#ccc] justify-center'>
                        <div className='flex w-full '>
                            <Link to='/sign-in' className='duration-200 p-4 hover:text-white hover:bg-[#1c2c5e]'>Online Banking</Link>
                            <Link to='/sign-in' className='duration-200 p-4 hover:text-white hover:bg-[#1c2c5e] whitespace-nowrap'>Credit Cards</Link>
                            <Link to='/sign-in' className='duration-200 p-4 hover:text-white hover:bg-[#1c2c5e] whitespace-nowrap'>Checking & Savings</Link>
                            <Link to='/sign-in' className='duration-200 p-4 hover:text-white hover:bg-[#1c2c5e]'>Loans</Link>
                        </div>
                        <div className='flex'>
                            <Link to='/register' className='duration-200 p-4  whitespace-nowrap hover:text-white hover:bg-[#1c2c5e]'>Request Account</Link>
                            <Link to='/sign-in' className='whitespace-nowrap duration-200 p-4 flex hover:text-white hover:bg-[#1c2c5e] text-[white] font-semibold'>
                                Sign On
                                <div className='ml-2 pt-[2px]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>
                }

            </div>

        </>
    )
}

export default Header