import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNotifications } from 'reapop';
import { addMessage, deleteMessage, getAllMessages, resetAdminMessageError, resetAdminMessageSuccess, updateMessage } from '../../redux/Slices/adminMessagesSlice';
import { DataGrid } from '@mui/x-data-grid';
import accounting from 'accounting';



const AdminMessages = () => {
    const [user, setUser] = useState('')
    const [message, setMessage] = useState('')
    const [title, setTitle] = useState('')
    const [messageID, setMessageID] = useState('')

    const [editField, setEditField] = useState('');
    const [editID, setEditID] = useState('')
    const [editValue, setEditValue] = useState('');
    const { notify } = useNotifications();
    const { error, success, messages, loading } = useSelector(state => state.adminMessage)
    const dispatch = useDispatch();

    const deleteMessageHandler = (e) => {
        e.preventDefault();

        dispatch(deleteMessage({ id: messageID }));
        setMessageID('')
    }

    useEffect(() => {
        if (editField && editValue && editID) {
            dispatch(updateMessage({ value: editValue, field: editField, id: editID }))
        }
    }, [dispatch, editField, editID, editValue])


    useEffect(() => {
        dispatch(getAllMessages())

        if (error) {
            notify(error, 'error')
            dispatch(resetAdminMessageError())
        }

        if (success) {
            notify('Action was successful', 'success')
            dispatch(resetAdminMessageSuccess())
            
        }

    }, [error, success, dispatch, notify])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(addMessage({ title, text: message, user }));
        setTitle('')
        setMessage('')
        setUser('')



    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'title', headerName: 'Title', editable: true, width: 150  },
        { field: 'text', headerName: 'Message', editable: true, width: 600 },
        { field: 'user', headerName: 'User ID', editable: true, width: 250 },
        { field: 'fullName', headerName: 'Full name' },


    ]



    const rows = []

    messages && messages?.forEach(message => {
        rows.push({
            id: message?._id,
            title: message?.title,
            text: message?.text,
            user: message?.user?._id,
            fullName: message?.user?.firstName + ' ' + message?.user?.lastName 



        })
    })





    return (
        <>
            <div className='flex flex-col justify-center'>

                <form className='px-4 ' onSubmit={submitHandler}>

                    <div className='mt-6 bg-slate-100 border border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center flex-wrap'>
                        <h1 className='mb-4 flex justify-start w-full font-bold'>SEND BANK MESSAGE
                        </h1>
                        <div className='mt-6 flex flex-col justify-center lg:px-12 lg:w-[50rem] items-center'>

                            <div className='flex flex-col relative m-5 w-fit h-fit '>

                                <div className='flex flex-col relative m-5 w-fit h-fit '>
                                    <input
                                        className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                        type='text'
                                        placeholder=' '
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}

                                    />
                                    <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                        Title
                                    </label>

                                </div>
                                <div className='flex flex-col relative m-5 w-fit h-fit '>
                                    <input
                                        className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                        type='text'
                                        placeholder=' '
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}

                                    />
                                    <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                        Message
                                    </label>

                                </div>
                                <div className='flex flex-col relative m-5 w-fit h-fit '>
                                    <input
                                        className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                        type='text'
                                        placeholder=' '
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}

                                    />
                                    <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                        USER ID
                                    </label>

                                </div>





                            </div>

                            <button type='submit' className=' bg-[#3ebde4] m-5 w-fit p-2 text-white font-semibold rounded-md px-6'>
                                Send Message
                            </button>
                        </div>
                    </div>
                </form>
                <div className='flex flex-col justify-center w-full items-center p-8'>
                    <div className='bg-slate-100 m-5 max-w-fit rounded-xl'>
                        <h1 className='px-20 p-8 font-bold '>
                            {messages?.length} Messages
                        </h1>
                    </div>
                    <form className='flex items-center ' onSubmit={deleteMessageHandler}>
                        <div className='flex flex-col relative m-5 w-fit h-fit border-2 rounded-lg bg-red-100'>
                            <input
                                className='z-[1] rounded-lg bg-transparent peer pb-2 outline-none  placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                type='text'
                                placeholder=' '
                                onChange={(e) => setMessageID(e.target.value)}
                                value={messageID}
                            />
                            <label className='px-3 font-semibold text-black lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-red-500 peer-focus:font-bold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none'>
                                MESSAGE ID
                            </label>
                        </div>
                        <button type='submit' className='text-sm bg-red-400 h-fit w-fit p-1 font-semibold rounded-lg'>
                            DELETE MESSAGE
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

export default AdminMessages