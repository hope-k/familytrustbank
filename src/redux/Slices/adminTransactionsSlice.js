import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'


export const getAllTransactions = createAsyncThunk('/all-transactions', async () => {
    try {
        const { data } = await axios.get('/api/all-transactions')
        return data
    } catch (err) {
        return err.response.data
    }
})
export const updateTransactions = createAsyncThunk('/update-user', async (updateFields) => {
    try {
        const { id, value, field } = updateFields
        const { data } = await axios.put('/api/update-transaction', {
            id: id,
            field: field,
            value: value
        });
        return data
    } catch (err) {
        return err.response.data
    }
})
export const deleteTransaction = createAsyncThunk('/delete-transaction', async ({ id }) => {
    try {
        const { data } = await axios.delete(`/api/delete-transaction/?id=${id}`);
        return data
    } catch (err) {
        return err.response.data
    }
})
export const adminDeposit = createAsyncThunk('/admin-deposit', async ({ user, status, accountId, transactionType, amount }) => {
    try {
        const { data } = await axios.post(`/api/admin-deposit`, { user, status, accountId, transactionType, amount });
        return data
    } catch (err) {
        return err.response.data
    }
})











const initialState = {
    loading: false,
    transactions: [],
    error: null,
    success: null

}

const adminTransactionsSlice = createSlice({
    name: 'adminTransactionsSlice',
    initialState: initialState,
    reducers: {
        resetAdminTransactionsSuccess: (state, payload) => {
            state.success = null
        },
        resetAdminTransactionsError: (state, payload) => {
            state.error = null
        },
    },
    extraReducers: {
        [getAllTransactions.fulfilled]: (state, action) => {
            state.loading = false
            state.transactions = action.payload?.transactions
            state.error = action?.payload?.error?.message
        },
        [getAllTransactions.pending]: (state, action) => {
            state.loading = true
        },
        [getAllTransactions.rejected]: (state, action) => {
            state.loading = false
        },
        [updateTransactions.fulfilled]: (state, action) => {
            state.success = action.payload?.success
            state.error = action.payload?.error?.message
        },
        [deleteTransaction.fulfilled]: (state, action) => {
            state.success = action.payload?.success
            state.error = action.payload?.error?.message
        },
        [adminDeposit.fulfilled]: (state, action) => {
            state.success = action.payload?.success
            state.error = action.payload?.error?.message
        }

    }

})
export const { resetAdminTransactionsError, resetAdminTransactionsSuccess } = adminTransactionsSlice.actions

export default adminTransactionsSlice.reducer


