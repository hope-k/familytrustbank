import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import instance from '../../axios';

export const getMyAccounts = createAsyncThunk('/myAccounts', async (_, {getState}) => {
    try {
        const state = getState()
        const token = state.auth?.token
        const { data } = await instance.get('/api/accounts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return data
    } catch (err) {
        return err.response.data
    }
});







const initialState = {
   accounts: [],
   loading: false,
   error: null
}

const accountsSlice = createSlice({
    name: 'accountsSlice',
    initialState: initialState,
    reducers: {

    },
    extraReducers: {
        [getMyAccounts.fulfilled]: (state, action) => {
            state.accounts = action?.payload?.accounts
            state.loading = false
            state.error = action?.payload?.error?.message

        },
        [getMyAccounts.pending]: (state, action) => {
            state.loading = true
        },
        [getMyAccounts.rejected]: (state, action) => {
            state.loading = false
        }
    }

})

export default accountsSlice.reducer


