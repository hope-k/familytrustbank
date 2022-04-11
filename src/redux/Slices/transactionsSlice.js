import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'


export const getMyTransactions = createAsyncThunk('/getTransactions', async () => {
    try {
        const { data } = await axios.get('/api/transactions')
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


