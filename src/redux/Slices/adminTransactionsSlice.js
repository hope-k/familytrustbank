import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../axios';


export const getAllTransactions = createAsyncThunk('/all-transactions', async (_, { getState }) => {
    try {
        const state = getState()
        const token = state.auth?.token
        const { data } = await instance.get('/api/all-transactions', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return data
    } catch (err) {
        return err.response.data
    }
})
export const updateTransactions = createAsyncThunk('/update-user', async (updateFields, { getState }) => {
    try {
        const state = getState()
        const token = state.auth?.token
        const { id, value, field } = updateFields
        const { data } = await instance.put('/api/update-transaction', {
            id: id,
            field: field,
            value: value
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data
    } catch (err) {
        return err.response.data
    }
})
export const deleteTransaction = createAsyncThunk('/delete-transaction', async ({ id }, { getState }) => {
    try {
        const state = getState()
        const token = state.auth?.token
        const { data } = await instance.delete(`/api/delete-transaction/?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data
    } catch (err) {
        return err.response.data
    }
})
export const adminDeposit = createAsyncThunk('/admin-deposit', async ({ user, status, accountId, transactionType, amount }, { getState }) => {
    try {
        const state = getState()
        const token = state.auth?.token
        const { data } = await instance.post(`/api/admin-deposit`, { user, status, accountId, transactionType, amount }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
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


