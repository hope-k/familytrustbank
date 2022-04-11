import React, { useEffect, useState } from 'react'
import { getAllTransactions, resetAdminTransactionsError, deleteTransaction, resetAdminTransactionsSuccess, updateTransactions } from '../../redux/Slices/adminTransactionsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { useNotifications } from 'reapop';
import moment from 'moment'

const AdminTransactions = () => {
    const navigate = useNavigate()
    const { success, error, transactions } = useSelector(state => state.adminTransactions)
    const { notify } = useNotifications()
    const [editField, setEditField] = useState('');
    const [editID, setEditID] = useState('')
    const [editValue, setEditValue] = useState('');
    const [transactionID, setTransactionID] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTransactions())

        if (error) {
            notify(error, 'error', { dismissAfter: 5000 })
            dispatch(resetAdminTransactionsError())
        }

        if (success) {
            dispatch(resetAdminTransactionsSuccess())
            notify(`Action was successful`, 'success')
        }

    }, [dispatch, error, success, editField, notify, navigate]);



    useEffect(() => {
        if (editField && editValue && editID) {
            if (editField === 'createdAt') {
                const createdAt = moment(editValue).toISOString()
                console.log(createdAt)
                const updateFields = { field: editField, value: createdAt, id: editID }
                dispatch(updateTransactions(updateFields));
            }
            const updateFields = { field: editField, value: editValue, id: editID }
            dispatch(updateTransactions(updateFields));
        }
    }, [editField, editID, editValue, dispatch]);

    const columns = [
        { field: 'id', headerName: 'Transaction ID', width: 280 },
        { field: 'transactionType', headerName: 'Transaction Type', editable: true, width: 124 },
        { field: 'status', headerName: 'Status ', editable: true },
        { field: 'amount', headerName: 'Amount', editable: true },
        { field: 'user', headerName: 'User ID', width: 280 },
        { field: 'fullName', headerName: 'Full name', width: 150 },
        { field: 'account', headerName: 'From Account', width: 150 },
        { field: 'payeeAccountNumber', headerName: 'Account No', editable: true },
        { field: 'payeeRoutingNumber', headerName: 'Routing No', editable: true },
        { field: 'createdAt', headerName: 'Created At', width: 220, editable: true },
        { field: 'memo', headerName: 'Memo', editable: true, width: 280 },

    ]



    const rows = [];

    transactions && transactions.forEach(transaction => {
        rows.push({
            id: transaction?._id,
            transactionType: transaction?.transactionType,
            payeeAccountNumber: transaction?.payeeAccountNumber,
            payeeRoutingNumber: transaction?.payeeRoutingNumber,
            status: transaction?.status,
            amount: transaction?.amount,
            user: transaction?.user?._id,
            fullName: transaction?.user?.firstName + ' ' + transaction?.user?.lastName,
            createdAt: moment(transaction?.createdAt).format('LLL'),
            memo: transaction?.memo,
            account: transaction?.accountId?.accountType,
        })
    })

    const deleteTransactionHandler = (e) => {
        e.preventDefault();
        dispatch(deleteTransaction({ id: transactionID }));
        setTransactionID('')
    }

    return (
        <div className='flex flex-col justify-center w-full items-center p-8'>
            <div className='bg-slate-100 m-5 max-w-fit rounded-xl'>
                <h1 className='px-20 p-8 font-bold '>
                    {transactions?.length} Transactions
                </h1>
            </div>
            <form className='flex items-center ' onSubmit={deleteTransactionHandler}>
                <div className='flex flex-col relative m-5 w-fit h-fit border-2 rounded-lg bg-red-100'>
                    <input
                        className='z-[1] rounded-lg bg-transparent peer pb-2 outline-none  placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                        type='text'
                        placeholder=' '
                        onChange={(e) => setTransactionID(e.target.value)}
                        value={transactionID}
                    />
                    <label className='px-3 font-semibold text-black lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-red-500 peer-focus:font-bold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none'>
                        TRANSACTION ID
                    </label>

                </div>
                <button type='submit' className='text-sm bg-red-400 h-fit w-fit p-1 font-semibold rounded-lg'>
                    DELETE TRANSACTION
                </button>
            </form>
            <div className='h-[30rem] w-full px-4 flex justify-center items-center bg-slate-50  rounded-3xl '>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    disableSelectionOnClick
                    onCellEditCommit={(cell) => { setEditField(cell.field); setEditValue(cell.value); setEditID(cell.id) }}
                />
            </div>
        </div>
    )
}

export default AdminTransactions