import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../axios';


export const getAllStats = createAsyncThunk('/all-stats', async () => {
    try {
        const { data } = await instance.get('/api/all-stats')
        return data
    } catch (err) {
        return err.response.data
    }
})
export const addStat = createAsyncThunk('/add-stat', async (statObj) => {
    try {
        const { incomeYear, incomeAmount, expenseYear, expenseAmount, user } = statObj
        const { data } = await instance.post('/api/add-stat', {
            incomeYear, incomeAmount, expenseYear, expenseAmount, user
        });
        return data
    } catch (err) {
        return err.response.data
    }
})
export const deleteStat = createAsyncThunk('/delete-stat', async (deleteID) => {
    try {
        const { statID } = deleteID
        const { data } = await instance.delete(`/api/delete-stat/?id=${statID}`);
        return data
    } catch (err) {
        return err.response.data
    }
})











const initialState = {
    loading: false,
    stats: [],
    error: null,
    success: null

}

const adminStatSlice = createSlice({
    name: 'adminStatSlice',
    initialState: initialState,
    reducers: {
        resetAdminStatSuccess: (state, payload) => {
            state.success = null
        },
        resetAdminStatError: (state, payload) => {
            state.error = null
        },
    },
    extraReducers: {
        [getAllStats.fulfilled]: (state, action) => {
            state.loading = false
            state.stats = action.payload?.stats
        },
        [getAllStats.pending]: (state, action) => {
            state.loading = true
        },
        [getAllStats.rejected]: (state, action) => {
            state.loading = false
        },
        [addStat.fulfilled]: (state, action) => {
            state.success = action.payload?.success
            state.error = action.payload?.error?.message
        },
        [deleteStat.fulfilled]: (state, action) => {
            state.success = action.payload?.success
            state.error = action.payload?.error?.message
        }

    }

})
export const { resetAdminStatError, resetAdminStatSuccess } = adminStatSlice.actions

export default adminStatSlice.reducer


