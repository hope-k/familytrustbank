import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'


export const getAllUsers = createAsyncThunk('/all-users', async () => {
    try {
        const { data } = await axios.get('/api/all-users')
        return data
    } catch (err) {
        return err.response.data
    }
})
export const deleteUser = createAsyncThunk('/delete-user', async ({ id }) => {
    try {
        const { data } = await axios.delete(`/api/delete-user/?id=${id}`)
        return data
    } catch (err) {
        return err.response.data
    }
})
export const updateUser = createAsyncThunk('/update-user', async (userUpdate) => {
    try {
        const { id, value, field } = userUpdate
        const { data } = await axios.put('/api/update-user', {
            id: id,
            field: field,
            value: value
        });
        return data
    } catch (err) {
        return err.response.data
    }
})











const initialState = {
    loading: false,
    users: [],
    error: null,
    success: null

}

const adminUsersSlice = createSlice({
    name: 'adminUsersSlice',
    initialState: initialState,
    reducers: {
        resetAdminUsersSuccess: (state, payload) => {
            state.success = null
        },
        resetAdminUsersError: (state, payload) => {
            state.error = null
        },
    },
    extraReducers: {
        [getAllUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload?.users
            state.error = action?.payload?.error?.message
        },
        [getAllUsers.pending]: (state, action) => {
            state.loading = true
        },
        [getAllUsers.rejected]: (state, action) => {
            state.loading = false
        },
        [updateUser.fulfilled]: (state, action) => {
            state.success = action.payload?.success
            state.error = action.payload?.error?.message
        },        
        [deleteUser.fulfilled]: (state, action) => {
            state.success = action.payload?.success
            state.error = action.payload?.error?.message
        }

    }

})
export const { resetAdminUsersSuccess, resetAdminUsersError } = adminUsersSlice.actions

export default adminUsersSlice.reducer


