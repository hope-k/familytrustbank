import React, { useEffect, useState } from 'react'
import { BiTransfer } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'
import { getMyAccounts } from '../../redux/Slices/accountsSlice'
import accounting from 'accounting'
import { makeTransfer, resetTransferSuccess, resetTransferError } from '../../redux/Slices/transferSlice'
import { useNotifications } from 'reapop'
import { useNavigate } from 'react-router-dom'


const Transfer = () => {
    const navigate = useNavigate()
    const { notify } = useNotifications()
    const { error, loading, success } = useSelector(state => state.transfer)
    const dispatch = useDispatch();
    useEffect(() => {

        if (loading) {
            notify('Processing Transaction...', 'loading', { dismissible: false })
        } 
        if (error) {
            notify(error, { title: 'Transaction Error', status: 'error' })
            dispatch(resetTransferError())
        }
        if (success) {
            notify('Transaction Approved and is Being Processed', { title: 'Transaction Being Processed', status: 'success' })
            dispatch(resetTransferSuccess());
            navigate('/account/transactions');
        }

    }, [error, dispatch, notify, loading, success, navigate]);

    useEffect(() => {
        dispatch(getMyAccounts())
    }, [dispatch])

    const { accounts } = useSelector(state => state.accounts);
    const [payeeAccountNumber, setPayeeAccountNumber] = useState('');
    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
    const [payeeRoutingNumber, setPayeeRoutingNumber] = useState('');
    const [memo, setMemo] = useState('');
    const [amount, setAmount] = useState('');
    const [accountId, setAccountId] = useState(`${accounts?.[0]?._id}`);

    const submitHandler = (e) => {
        e.preventDefault()
        const transferDetails = {
            payeeAccountNumber,
            confirmAccountNumber,
            payeeRoutingNumber,
            memo,
            amount,
            accountId
        }
        dispatch(makeTransfer(transferDetails))
    }


    return (
        <div className='lg:w-[83.6%] lg:absolute lg:right-0 z-50 relative'>
            <h1 className='lg:px-[7rem] top-[15rem] px-4 text-white font-semibold text-xl flex items-center fixed lg:top-40'>
                Transfer Funds <BiTransfer className='ml-2 text-2xl text-white' />
            </h1>
            <div className='flex h-full items-center mt-[20rem]'>
                <div className="container relative px-[1.5rem] md:px-[5rem] lg:px-[20rem] pb-6">
                    <div className='bg-gray-100 p-4 pb-10 rounded-xl shadow-2xl'>
                        <div className='p-6 bg-gray-200 rounded-2xl'>
                            <h1 className='font-semibold text-base'>Transfer Details</h1>

                        </div>
                        <form className='px-4 ' onSubmit={submitHandler}>
                            <div className='flex justify-between mt-4 border-b border-gray-300 py-4 '>
                                <label htmlFor='from' className='font-semibold'>
                                    From:
                                </label>
                                <select onChange={(e) => setAccountId(e.target.value)} value={accountId} className='px-6 font-semibold text-[0.888rem] border-teal-500 border rounded-lg hover:border-teal-700 hover:border-2 duration-300' >
                                    {
                                        accounts && accounts.map((account) => (
                                            <option value={account?._id}>...{account?.accountNumber.slice(-4)} {account?.accountType} {
                                                accounting.formatMoney(account?.balance)
                                            }
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='mt-6 bg-slate-100 border border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center'>
                                <h1 className='mb-4 flex justify-start w-full font-bold'>Recipient:</h1>
                                <div className='mt-6  flex flex-wrap justify-between'>
                                    <div className='flex flex-col relative mt-8 w-fit h-fit '>
                                        <input
                                            className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                            type='number'
                                            placeholder=' '
                                            onChange={(e) => setPayeeRoutingNumber(e.target.value)}

                                        />
                                        <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                            Routing Number
                                        </label>

                                    </div>
                                    <div className='flex flex-col relative mt-6 w-fit h-fit'>
                                        <input
                                            className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                            type='number'
                                            placeholder=' '
                                            onChange={(e) => setPayeeAccountNumber(e.target.value)}


                                        />
                                        <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold    peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                            Account Number
                                        </label>

                                    </div>
                                    <div className='flex flex-col relative mt-6 w-fit h-fit'>
                                        <input
                                            className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                            type='number'
                                            placeholder=' '
                                            onChange={(e) => setConfirmAccountNumber(e.target.value)}


                                        />
                                        <label className=' whitespace-nowrap lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                            Confirm Account Number
                                        </label>

                                    </div>
                                    <div className='flex flex-col relative mt-6 w-fit h-fit'>
                                        <input
                                            className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                            type='text'
                                            placeholder=' '
                                            onChange={(e) => setMemo(e.target.value)}


                                        />
                                        <label className=' whitespace-nowrap lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                            Memo
                                        </label>

                                    </div>
                                    <div className='flex flex-col relative mt-6 w-fit h-fit rounded-xl'>
                                        <NumberFormat
                                            className=' bg-[#cfcece33] peer pb-2 rounded-none border-b-2 border-green-700 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                            thousandsGroupStyle="thousand"
                                            prefix="$"
                                            decimalSeparator="."
                                            displayType="input"
                                            type="tel"
                                            placeholder=' '
                                            thousandSeparator={true}
                                            onValueChange={(value) => setAmount(value.floatValue)}
                                        />
                                        <label className='whitespace-nowrap lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                            Amount $
                                        </label>

                                    </div>

                                </div>

                                <button type='submit' className=' bg-[#3ebde4] w-fit h-fit p-2 text-white font-semibold rounded-md px-6'>
                                    Transfer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Transfer