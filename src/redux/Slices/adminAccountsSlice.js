import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../axios';


export const getAllAccounts = createAsyncThunk('/all-accounts', async () => {
    try {
        const { data } = await instance.get('/api/all-accounts')
        return data
    } catch (err) {
        return err.response.data
    }
});
export const updateAccount = createAsyncThunk('/update-account', async ({id, field, value}) => {
    try {
        const { data } = await instance.put('/api/update-account', {
            field, value, id
        })
        return data
    } catch (err) {
        return err.response.data
    }
});
export const deleteAccount = createAsyncThunk('/delete-account', async ({ id }) => {
    try {
        const { data } = await instance.delete(`/api/delete-account/?id=${id}`)
        return data
    } catch (err) {
        return err.response.data
    }
});
export const createAccount = createAsyncThunk('/create-account', async ({ accountType, balance, user }) => {
    try {
        const { data } = await instance.post(`/api/add-account`, {
            accountType,
            balance,
            user
        })
        return data
    } catch (err) {
        return err.response.data
    }
});







const initialState = {
    accounts: [],
    loading: false,
    error: null,
    success: null
}

const adminAccountsSlice = createSlice({
    name: 'adminAccountsSlice',
    initialState: initialState,
    reducers: {
        resetAdminAccountsSuccess: (state, payload) => {
            state.success = null
        },
        resetAdminAccountsError: (state, payload) => {
            state.error = null
        },

    },
    extraReducers: {
        [getAllAccounts.fulfilled]: (state, action) => {
            state.accounts = action?.payload?.accounts
            state.loading = false
        },
        [getAllAccounts.pending]: (state, action) => {
            state.loading = true
        },
        [getAllAccounts.rejected]: (state, action) => {
            state.loading = false
        },
        [updateAccount.fulfilled]: (state, action) => {
            state.success = action.payload?.success
            state.error = action.payload?.error?.message
        },
        [deleteAccount.fulfilled]: (state, action) => {
            state.success = action.payload?.success
            state.error = action.payload?.error?.message
        },
        [createAccount.fulfilled]: (state, action) => {
            state.success = action.payload?.success
            state.error = action.payload?.error?.message
        }
    }

})
export const { resetAdminAccountsError, resetAdminAccountsSuccess } = adminAccountsSlice.actions
export default adminAccountsSlice.reducer


