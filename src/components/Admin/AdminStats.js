import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNotifications } from 'reapop';
import { addStat, resetAdminStatError, resetAdminStatSuccess, getAllStats, deleteStat } from '../../redux/Slices/adminStatsSlice';
import { DataGrid } from '@mui/x-data-grid';



const AdminStats = () => {
    const [statID, setStatID] = useState('')
    const [incomeYear, setIncomeYear] = useState('')
    const [incomeAmount, setIncomeAmount] = useState('')
    const [expenseYear, setExpenseYear] = useState('')
    const [expenseAmount, setExpenseAmount] = useState('')
    const [editField, setEditField] = useState('');
    const [editID, setEditID] = useState('')
    const [editValue, setEditValue] = useState('');
    const [user, setUser] = useState('')
    const { notify } = useNotifications();
    const { error, success, stats } = useSelector(state => state.adminStat)
    const dispatch = useDispatch();

    const deleteStatHandler = (e) => {
        e.preventDefault();
        const deleteID = {
            statID
        }
        dispatch(deleteStat(deleteID));
        setStatID('')
    }




    useEffect(() => {
        dispatch(getAllStats())

        if (error) {
            notify(error, 'error')
            dispatch(resetAdminStatError())
        }

        if (success) {
            notify('Action was successful', 'success')
            dispatch(resetAdminStatSuccess())
        }

    }, [error, success, dispatch, notify])

    const submitHandler = (e) => {
        e.preventDefault();
        const statObj = {
            incomeAmount,
            incomeYear,
            expenseAmount,
            expenseYear,
            user
        }
        dispatch(addStat(statObj));
 


    }
    const columns = [
        { field: 'id', headerName: 'Stat ID', width: 270 },
        { field: 'incomeYear', headerName: 'Income Year', },
        { field: 'income', headerName: 'Income', },
        { field: 'expenseYear', headerName: 'Expense Year', },
        { field: 'expense', headerName: 'Expense', },
        { field: 'userId', headerName: 'User ID', width: 230 },
        { field: 'fullName', headerName: 'Full name', },
    ]



    const rows = []

    stats && stats.forEach(stat => {
        rows.push({
            id: stat?._id,
            fullName: stat?.user?.firstName + ' ' + stat?.user?.lastName,
            incomeYear: stat?.income?.year,
            income: stat?.income?.amount,
            expenseYear: stat?.expense?.year,
            expense: stat?.expense?.amount,
            userId: stat?.user?._id



        })
    })





    return (
        <>
            <div className='flex flex-col justify-center'>
                <form className='px-4 ' onSubmit={submitHandler}>

                    <div className='mt-6 bg-slate-100 border border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center'>
                        <h1 className='mb-4 flex justify-start w-full font-bold'>ADD ACCOUNT STATISTICS
                        </h1>
                        <div className='mt-6  flex flex-wrap justify-center lg:px-12 lg:w-[50rem]'>

                            <div className='flex flex-col relative m-5 w-fit h-fit '>
                                <input
                                    className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                    type='text'
                                    placeholder=' '
                                    value={incomeYear}
                                    onChange={(e) => setIncomeYear(e.target.value)}

                                />
                                <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                    Income Year
                                </label>

                            </div>
                            <div className='flex flex-col relative m-5 w-fit h-fit '>
                                <input
                                    className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                    type='text'
                                    placeholder=' '
                                    value={incomeAmount}
                                    onChange={(e) => setIncomeAmount(e.target.value)}


                                />
                                <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                    Income Amount
                                </label>

                            </div>
                            <div className='flex flex-col relative m-5 w-fit h-fit '>
                                <input
                                    className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                    type='text'
                                    placeholder=' '
                                    onChange={(e) => setExpenseYear(e.target.value)}
                                    value={expenseYear}


                                />
                                <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                    Expense Year
                                </label>

                            </div>
                            <div className='flex flex-col relative m-5 w-fit h-fit '>
                                <input
                                    className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                    type='text'
                                    placeholder=' '
                                    value={expenseAmount}
                                    onChange={(e) => setExpenseAmount(e.target.value)}


                                />
                                <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                    Expense Amount
                                </label>

                            </div>
                            <div className='flex flex-col relative m-5 w-fit h-fit '>
                                <input
                                    className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                    type='text'
                                    placeholder=' '
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}


                                />
                                <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                    USER ID
                                </label>

                            </div>


                        </div>

                        <button type='submit' className=' bg-[#3ebde4] m-5 w-fit p-2 text-white font-semibold rounded-md px-6'>
                            Add STAT
                        </button>
                    </div>
                </form>
                <div className='flex flex-col justify-center w-full items-center p-8'>
                    <div className='bg-slate-100 m-5 max-w-fit rounded-xl'>
                        <h1 className='px-20 p-8 font-bold '>
                            {stats?.length} Stats
                        </h1>
                    </div>
                    <form className='flex items-center ' onSubmit={deleteStatHandler}>
                        <div className='flex flex-col relative m-5 w-fit h-fit border-2 rounded-lg bg-red-100'>
                            <input
                                className='z-[1] rounded-lg bg-transparent peer pb-2 outline-none  placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                type='text'
                                placeholder=' '
                                onChange={(e) => setStatID(e.target.value)}
                                value={statID}


                            />
                            <label className='px-3 font-semibold text-black lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-red-500 peer-focus:font-bold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none'>
                                Stat ID
                            </label>

                        </div>
                        <button type='submit' className='text-sm bg-red-400 h-fit w-fit p-1 font-semibold rounded-lg'>
                            DELETE STAT
                        </button>
                    </form>
                    <div className='h-[30rem] w-full px-4 flex justify-center items-center bg-slate-100  rounded-3xl '>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            disableSelectionOnClick
                            onCellEditCommit={(cell) => { setEditField(cell.field); setEditValue(cell.value); setEditID(cell.id) }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminStats