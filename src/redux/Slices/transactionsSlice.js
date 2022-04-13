import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import instance from '../../axios';


export const getMyTransactions = createAsyncThunk('/getTransactions', async (_, {getState}) => {
    try {
        const state = getState()
        const token = state.auth?.token
        const { data } = await instance.get('/api/transactions', {
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
    loading: true,
    error: null,
    transactions: []
    
  
}

const transactionsSlice = createSlice({
    name: 'transactionsSlice',
    initialState: initialState,
    reducers: {

    },
    extraReducers: {
        [getMyTransactions.fulfilled]: (state, action) => {
            state.transactions = action?.payload?.transactions
            state.loading = false
        },
        [getMyTransactions.pending]: (state, action) => {
            state.loading = true
        },
        [getMyTransactions.rejected]: (state, action) => {
            state.loading = false
        },

    }

})

export default transactionsSlice.reducer


