import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../axios';


export const getAllMessages = createAsyncThunk('/all-messages', async () => {
    try {
        const { data } = await instance.get('/api/all-messages')
        return data
    } catch (err) {
        return err.response.data
    }
})
export const addMessage = createAsyncThunk('/add-message', async ({ title, text, user }) => {
    try {
        const { data } = await instance.post('/api/add-message', { title, text, user });
        return data
    } catch (err) {
        return err.response.data
    }
})
export const deleteMessage = createAsyncThunk('/delete-message', async ({ id }) => {
    try {
        const { data } = await instance.delete(`/api/delete-message/?id=${id}`);
        return data
    } catch (err) {
        return err.response.data
    }
})
export const updateMessage = createAsyncThunk('/update-message', async ({ field, id, value }) => {
    try {
        const { data } = await instance.put(`/api/update-message/`, {
            id, field, value
        });
        return data
    } catch (err) {
        return err.response.data
    }
})











const initialState = {
    loading: false,
    messages: [],
    error: null,
    success: null

}

const adminMessageSlice = createSlice({
    name: 'adminMessageSlice',
    initialState: initialState,
    reducers: {
        resetAdminMessageSuccess: (state, payload) => {
            state.success = null
        },
        resetAdminMessageError: (state, payload) => {
            state.error = null
        },
    },
    extraReducers: {
        [getAllMessages.fulfilled]: (state, action) => {
            state.loading = false
            state.messages = action.payload?.messages
        },
        [getAllMessages.pending]: (state, action) => {
            state.loading = true
        },
        [getAllMessages.rejected]: (state, action) => {
            state.loading = false
        },
        [addMessage.fulfilled]: (state, action) => {
            state.success = action.payload?.success
            state.error = action.payload?.error?.message
        },
        [deleteMessage.fulfilled]: (state, action) => {
            state.success = action.payload?.success
            state.error = action.payload?.error?.message
        },
        [updateMessage.fulfilled]: (state, action) => {
            state.success = action.payload?.success
            state.error = action.payload?.error?.message
        }

    }

})
export const { resetAdminMessageError, resetAdminMessageSuccess } = adminMessageSlice.actions

export default adminMessageSlice.reducer


