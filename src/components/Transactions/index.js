import React, {useEffect} from 'react'
import { BsArrowDownLeft, BsArrowUpRight } from 'react-icons/bs'
import { SearchIcon } from '@heroicons/react/outline'
import {useSelector, useDispatch} from 'react-redux'
import { GiChecklist } from 'react-icons/gi'
import { getMyTransactions } from '../../redux/Slices/transactionsSlice'
import moment from 'moment'
import ClockLoader from 'react-spinners/ClockLoader'
import accounting from 'accounting'


const Transactions = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyTransactions())
    }, [dispatch]);

    const {transactions, loading} = useSelector(state => state.transactions)
    return (
        <div className='lg:w-[83.6%] lg:absolute lg:right-0 z-50 relative '>
            <h1 className='lg:px-[7rem] top-[15rem] p-4 text-white font-semibold text-xl flex items-center fixed lg:top-40'>
                Transactions <GiChecklist className='ml-2 text-2xl text-white' />
            </h1>
            <div className='h-full pt-[20rem] lg:px-[16rem] md:px-[4rem] container px-4 z-50 relative'>
                <div className='bg-gray-100 w-full row rounded-xl h-full pt-3 shadow-2xl'>
                    <div className='p-4 lg:p-6'>
                        <div className='flex justify-between mb-6 items-center'>
                            <h1 className='font-semibold'>Transactions</h1>
                            <SearchIcon className='w-6' />
                        </div>

                        {
                            !loading && !transactions?.length ? (
                                <div className="px-2 flex items-center justify-center p-4 h-full">
                                    <div className=' bg-gray-200 p-4 rounded-3xl'>
                                        No Transactions
                                    </div>
                                </div>
                            ) :
                            transactions && transactions.map((transaction) => (
                                <div key={transaction?._id} className='w-full my-3 border-b border-gray-300 pb-3'>
                                    <h1 className='font-semibold text-[.9rem] flex items-center uppercase'>{transaction?.transactionType}{transaction?.transactionType === 'transfer' ? <BsArrowUpRight className='text-red-500' /> : <BsArrowDownLeft className='text-green-600' />}</h1>
                                    <div className='flex justify-between leading-5'>
                                        <div className='flex text-sm'>
                                            {
                                                transaction?.status === 'pending' ?
                                                    <ClockLoader size={16} speedMultiplier={0.5} color='#AEA7A7B8' />
                                                    :
                                                    <h1 className={'font-semibold text-sm capitalize ' + (transaction.status === 'failed' && 'text-red-500 ') + (transaction?.status === 'complete' && ' text-green-600 ')}>{transaction?.status}</h1>
                                            }
                                            <h1 className='mx-2 text-gray-500 text-[.8rem] font-light lg:font-normal'>{moment(transaction?.createdAt).format('LLL')}</h1>
                                            <h1 className=' text-gray-500'>...{transaction?.accountId?.accountNumber.slice(-4)} {transaction?.accountId?.accountType}</h1>
                                        </div>
                                        <h1 className={'font-semibold  whitespace-nowrap ' + (transaction?.transactionType === 'transfer' ? 'text-red-500' : 'text-[#00A389]')}>
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
            </div>


        </div>
    )
}

export default Transactions