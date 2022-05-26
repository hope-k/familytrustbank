import React, { useEffect, useState } from 'react'
import { getAllUsers, resetAdminUsersError, resetAdminUsersSuccess, updateUser, deleteUser } from '../../redux/Slices/adminUsersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { useNotifications } from 'reapop';
//RESTORE

const Users = () => {
    const navigate = useNavigate()
    const { success, error, users } = useSelector(state => state.users)
    const { isAuthenticated } = useSelector(state => state.auth)
    const { notify } = useNotifications()
    const [editField, setEditField] = useState('');
    const [editID, setEditID] = useState('')
    const [editValue, setEditValue] = useState('');
    const [userID, setUserID] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers())


        if (error) {
            notify(error, 'error', { dismissAfter: 5000 })
            dispatch(resetAdminUsersError())
        }

        if (success) {
            dispatch(resetAdminUsersSuccess())
            notify(`Action was successful`, 'success')
        }

    }, [dispatch, error, success, notify, navigate, isAuthenticated]);



    useEffect(() => {
        if (editField && editValue && editID) {
            const userUpdate = { field: editField, value: editValue, id: editID }
            dispatch(updateUser(userUpdate));
        }
    }, [editField, editID, editValue, dispatch]);

    const columns = [
        { field: 'id', headerName: 'User ID', width: 300 },
        { field: 'firstName', headerName: 'First name', editable: true },
        { field: 'lastName', headerName: 'Last name', editable: true },
        { field: 'status', headerName: 'Status', editable: true },
        { field: 'username', headerName: 'User Name', editable:true },
        { field: 'role', headerName: 'Role', editable: true },
        { field: 'dob', headerName: 'DOB', editable: true },
        { field: 'phone', headerName: 'Phone', editable: true, width: 151 },
        { field: 'ssn', headerName: 'SSN', editable: true },
        { field: 'address', headerName: 'Address', editable: true, width: 250 },
    ]



    const rows = []

    users && users.forEach(user => {
        rows.push({
            id: user?._id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            username: user?.username,
            dob: user?.dateOfBirth,
            phone: user?.phone,
            ssn: user?.ssn,
            status: user?.status,
            role: user?.role,
            address: user?.address,
        })
    })
    const deleteUserHandler = (e) => {
        e.preventDefault();
        dispatch(deleteUser({ id: userID }))

    }

    return (
        <div className='flex flex-col justify-center w-full items-center p-8'>
            <div className='bg-slate-100 m-5 max-w-fit rounded-xl'>
                <h1 className='px-20 p-8 font-bold '>
                    {users?.length} Users
                </h1>
            </div>
            <form className='flex items-center ' onSubmit={deleteUserHandler}>
                <div className='flex flex-col relative m-5 w-fit h-fit border-2 rounded-lg bg-red-100'>
                    <input
                        className='z-[1] rounded-lg bg-transparent peer pb-2 outline-none  placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                        type='text'
                        placeholder=' '
                        onChange={(e) => setUserID(e.target.value)}
                        value={userID}


                    />
                    <label className='px-3 font-semibold text-black lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-red-500 peer-focus:font-bold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none'>
                        USER ID
                    </label>

                </div>
                <button type='submit' className='text-sm bg-red-400 h-fit w-fit p-1 font-semibold rounded-lg'>
                    DELETE USER
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

export default Users