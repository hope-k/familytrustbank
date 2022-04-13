import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import instance from '../../axios';


export const makeTransfer = createAsyncThunk('/makeTransfer', async (transferDetails, {getState}) => {
    const {payeeAccountNumber, payeeRoutingNumber, confirmAccountNumber, amount, accountId, memo} = transferDetails
    try {
        const state = getState();
        const token = state.auth?.token
        const { data } = await instance.post('/api/add-transaction', { payeeAccountNumber, payeeRoutingNumber, confirmAccountNumber, amount, accountId, memo }, {
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
    error: null,
    loading: null,
    success: null,
}

const transferSlice = createSlice({
    name: 'transferSlice',
    initialState: initialState,
    reducers: {
        resetTransferSuccess: (state, action) => {
            state.success = null
        },
        resetTransferError: (state, action) => {
            state.error = null
        },

    },
    extraReducers: {
        [makeTransfer.fulfilled]: (state, action) => {
            state.success = action?.payload?.success || false
            state.loading = false
            state.error = action.payload?.error?.message
        },
        [makeTransfer.pending]: (state, action) => {
            state.loading = true
        },
        [makeTransfer.rejected]: (state, action) => {
            state.loading = false
        },

    }

})
export const { resetTransferSuccess, resetTransferError } = transferSlice.actions
export default transferSlice.reducer


