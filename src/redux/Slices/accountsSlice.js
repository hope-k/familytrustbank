import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'


export const getMyAccounts = createAsyncThunk('/myAccounts', async () => {
    try {
        const { data } = await axios.get('/api/accounts')
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


