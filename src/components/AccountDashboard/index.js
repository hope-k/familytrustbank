import React, { useEffect, useState, useRef } from 'react'
import { MdAccountBalance } from 'react-icons/md'
import { Outlet } from 'react-router-dom'
import DashboardNav from '../DashboardNav'
import ExpenseChart from '../ExpenseChart'
import IncomeCharts from '../IncomeCharts'
import { BellIcon } from '@heroicons/react/outline'
import { WiSunrise } from 'react-icons/wi'
import { BsSun, BsArrowDownLeft, BsArrowUpRight } from 'react-icons/bs'
import { MoonIcon } from '@heroicons/react/solid'
import { UserCircleIcon, ChevronDownIcon, SearchIcon, CashIcon, ClockIcon } from '@heroicons/react/outline'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { BiTransfer } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NumberFormat from 'react-number-format'
import { getMyAccounts } from '../../redux/Slices/accountsSlice'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
import { getMyStats } from '../../redux/Slices/statsSlice'
import { getMyTransactions } from '../../redux/Slices/transactionsSlice'
import moment from 'moment'
import ClockLoader from 'react-spinners/ClockLoader'
import { getMyMessages } from '../../redux/Slices/messagesSlice'
import accounting from 'accounting'
import { logout } from '../../redux/Slices/authSlice'

const AccountDashboard = ({ toggleProfileDropdown, profileDropdown }) => {

    const navigate = useNavigate()
    const t1 = useRef()
    const { isAuthenticated, token } = useSelector(state => state.auth)

    useEffect(() => {
        t1.current = gsap.timeline({
        }).to('#profileMenu', {
            y: 5,
            ease: 'power4.inOut',
            display: 'block',
            opacity: 1
        })
    }, [])

    useEffect(() => {
        if (profileDropdown) {
            t1.current.play()
        } else {
            t1.current.reverse()
        }
    }, [profileDropdown, t1])

    const dispatch = useDispatch();
 
 
    useEffect(() => {
        dispatch(getMyAccounts());
        dispatch(getMyStats())
        dispatch(getMyTransactions())
        dispatch(getMyMessages())


    }, [dispatch, isAuthenticated, token]);


    const { user } = useSelector(state => state.auth);
    const { stats } = useSelector(state => state.stats);
    const { transactions } = useSelector(state => state.transactions);
    const { messages } = useSelector(state => state.messages);
    const { accounts, error, loading } = useSelector(state => state.accounts);
    const myDate = new Date();
    const hrs = myDate.getHours();


    const showGreet = () => {
        if (hrs < 12) {
            return (
                <h1 className='flex items-center'>
                    <WiSunrise className='text-3xl' />
                    Good Morning
                </h1>
            )
        }
        else if (hrs >= 12 && hrs <= 17) {
            return (
                <h1 className='flex items-center'>
                    <BsSun className='text-3xl' />
                    Good Afternoon
                </h1>
            );
        }
        else if (hrs >= 17 && hrs <= 24) {
            return (
                <h1 className='flex items-center'>
                    <MoonIcon className='w-6' />
                    Good Evening
                </h1>
            )
        }

    }
    const logoutUser = () => {
        dispatch(logout());
        navigate(0)

    }
    const recentTransactions = transactions && transactions.slice(0, 4)
    const recentMessages = messages && messages && messages.slice(0, 2)

    return (
        <>
            <div className='lg:w-[83.6%] lg:absolute lg:right-0 z-[80] relative'>
                <div className='lg:px-10  relative px-4 '>
                    <div className='flex bg-blue-200 my-16 justify-between lg:px-[7rem] rounded-md mx-4 relative z-50'>
                        <div className='text-2xl font-light p-4 flex'>
                            {showGreet()}, {user?.firstName}
                        </div>
                        <div onClick={() => toggleProfileDropdown()} className='cursor-pointer items-center font-thin hidden lg:flex bg-teal-700 my-2 px-2 rounded-full text-gray-100 '>
                            <UserCircleIcon className='w-6 mr-2 stroke-1' />
                            {user?.firstName} {user?.lastName}
                            <ChevronDownIcon className='w-4 ml-1' />

                            <div id='profileMenu' className={"flex-col bg-blue-200 absolute bottom-0 mb-[-4.5rem] rounded rounded-bl-xl rounded-br-xl z-50 lg:hidden lg:opacity-0"}>
                                <div className='font-normal'>
                                    <div className='p-2 text-black border-b border-gray-300 hover:bg-blue-300 hover:rounded-xl'>Request Account Update</div>
                                    <div onClick={() => logoutUser()} className='p-2 text-red-500 hover:bg-blue-300 hover:rounded-xl'>Sign Out</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='container  lg:px-[7rem] pb-[4rem] rounded-xl z-40 relative '>
                        <div className='sticky top-0 my-16 bg-gray-100 rounded  text-gray-500 flex items-center p-4 justify-between lg:px-6 z-[60]'>
                            <h1 className=' text-md font-semi  flex items-center'>
                                Dashboard
                                <MdAccountBalance className='ml-2' />
                            </h1>
                            <Link to='/account/messages'>
                                {
                                    recentMessages && recentMessages.slice(0, 1).map(message =>
                                        moment(message?.createdAt).fromNow() === ('a few seconds ago' || '44 seconds ago' || 'a minute ago') && (<div className=' absolute right-5 top-3 bg-blue-400 rounded-full p-1'></div>)

                                    )
                                }
                                <BellIcon className='w-6' />
                            </Link>
                        </div>
                        <div className=''>
                            <div className={'mb-4 bg-gray-100 p-4 lg:p-[5rem] rounded-xl'}>
                                <div className='flex flex-wrap justify-between'>

                                    {
                                        !loading && !accounts?.length ? (
                                            <div className='w-full p-10 text-2xl text-red-600 bg-gray-200 rounded-3xl font-extralight'>!!NO ACCOUNTS OPENED CONTACT ADMIN!!</div>
                                        ) :

                                            accounts?.map((account) => (

                                                <div key={account?._id} className=' cursor-pointer bg-[#3ebde4] h-fit lg:w-[25rem] w-[20rem] rounded-md text-gray-50 relative border-none mb-4  lg:mb-2 ' >
                                                    <h1 className='border-t-2 mt-1 border-teal-500 bg-blue-100 px-6  font-semibold text-gray-600 text-sm'>...{account?.accountNumber.slice(-4)} {account?.accountType}</h1>
                                                    <div className='px-10'>
                                                        <div className='border-l-8 pl-3 border-teal-600 bg-[#009cd0] rounded-lg'>
                                                            <h1 className='font-light text-sm'> Available Balance</h1>
                                                            <h1 className='font-semibold text-[.92rem]'>
                                                                {
                                                                    accounting.formatMoney(account?.balance)
                                                                }

                                                            </h1>
                                                        </div>
                                                    </div>
                                                    <div className='bg-[#7cd3ee28] absolute h-[2rem] rounded-t-[10rem] rounded-br-[6rem] bottom-0  w-[4rem] right-0 '></div>
                                                </div>
                                            ))

                                    }
                                </div>

                                <div className='flex flex-wrap justify-around'>

                                    <div className={'bg-gray-200 rounded-3xl mb-6 mt-4 lg:my-6  px-4 shadow-2xl'}>
                                        <IncomeCharts stats={stats} />
                                    </div>
                                    <div className={' bg-gray-200  rounded-3xl mb-6 lg:my-6 px-4 shadow-2xl'}>
                                        <ExpenseChart stats={stats} />
                                    </div>

                                </div>

                            </div>
                            <div className='w-full  grid lg:grid-cols-2 lg:grid-rows-2 gap-[1rem] grid-cols-1'>
                                <div className='bg-gray-100 h-full w-full row-span-2 row rounded-xl'>
                                    <div className='p-6'>
                                        <div className='flex justify-between mb-6 items-center'>
                                            <h1 className='font-semibold'>Recent Transactions</h1>
                                            <SearchIcon className='w-6' />
                                        </div>
                                        {
                                            !loading && !recentTransactions?.length ? (
                                                <div className="px-2 flex items-center justify-center p-4 h-full">
                                                    <div className=' bg-gray-200 p-4 rounded-3xl'>
                                                        No Recent Transactions
                                                    </div>
                                                </div>
                                            ) :
                                                recentTransactions && recentTransactions.map((transaction) => (
                                                    <div key={transaction?._id} className='w-full my-3 border-b border-gray-300 pb-3'>
                                                        <h1 className='font-semibold text-[.9rem] flex items-center uppercase'>{transaction?.transactionType}{transaction?.transactionType === 'transfer' ? <BsArrowUpRight className='text-red-500' /> : <BsArrowDownLeft className='text-green-600' />}</h1>
                                                        <div className='flex justify-between leading-5'>
                                                            <div className='flex text-sm'>
                                                                {
                                                                    transaction?.status === 'pending' ?
                                                                        <ClockLoader size={16} speedMultiplier={0.5} color='#AEA7A7B8' />
                                                                        :
                                                                        <h1 className={'font-semibold capitalize ' + (transaction.status === 'failed' && 'text-red-500 ') + (transaction?.status === 'complete' && ' text-green-600 ')}>{transaction?.status}</h1>
                                                                }
                                                                <h1 className='mx-2 text-gray-500 text-[.8rem] font-light lg:font-normal ' >{moment(transaction?.createdAt).format('LLL')}</h1>
                                                                <h1 className=' text-gray-500'>...{transaction?.accountId?.accountNumber.slice(-4)} {transaction?.accountId?.accountType}</h1>
                                                            </div>
                                                            <h1 className={'font-semibold whitespace-nowrap ' + (transaction?.transactionType === 'transfer' ? 'text-red-500' : 'text-[#00A389]')}>
                                                                {
                                                                    transaction?.transactionType === 'transfer' ? '-' + accounting.formatMoney(transaction?.amount) : accounting.formatMoney(transaction?.amount)

                                                                }
                                                            </h1>
                                                        </div>
                                                    </div>
                                                ))
                                        }


                                    </div>
                                </div>
                                <div className='bg-gray-100 rounded-xl '>
                                    <div className="px-2">
                                        <h1 className='font-semibold px-4 py-4'>Payments</h1>
                                        <div className='flex  mt-6 justify-evenly border-b border-gray-300 pb-6 items-end'>
                                            <Link to='/account/transfer' className='flex flex-col items-center font-semibold text-sm'>
                                                <CashIcon className='w-6 stroke-[#90996e]' />
                                                Pay a bill
                                            </Link>
                                            <Link to='/account/transfer' className='flex flex-col items-center font-semibold text-sm'>
                                                <MdOutlinePersonOutline className='text-[1.7rem] text-[#90996e]' />
                                                Pay a Person
                                            </Link>
                                            <Link to='/account/transfer' className='flex flex-col items-center font-semibold text-sm'>
                                                <BiTransfer className='text-[1.4rem] text-[#90996e]' />
                                                Transfer
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-gray-100 rounded-xl p-4'>
                                    <h1 className='font-semibold lg:absolute'>Recent Messages</h1>
                                    {
                                        !recentMessages?.length ?
                                            <div className="px-2 flex items-center justify-center p-4 lg:h-full">
                                                <div className=' bg-gray-200 p-4 rounded-3xl'>
                                                    No New Messages
                                                </div>
                                            </div>
                                            :
                                            recentMessages && recentMessages.map((message) => (
                                                <>

                                                    <div key={message?._id} className='px-2 flex  p-2 mt-6 relative bg-slate-50 rounded-md shadow-lg'>
                                                        <div className="flex flex-col">
                                                            <h1 className='font-semibold'>{message?.title}</h1>
                                                            <h1 className='text-[.92rem] font-[350]'>{message?.text}</h1>
                                                        </div>
                                                        <h1 className='absolute right-0 font-extralight text-[.91rem]'>{moment(message?.createdAt).fromNow()}</h1>
                                                    </div>
                                                    <hr className='border-b border-gray-200' />
                                                </>
                                            ))

                                    }

                                </div>

                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default AccountDashboard