import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../axios';



export const getMyStats = createAsyncThunk('/stats', async () => {
    try {

        const { data } = await instance.get('/api/stats');
        return data
    } catch (err) {
        return err.response.data
    }
});









const initialState = {
    stats: [],
    error: null,
    loading: false,

}

const statsSlice = createSlice({
    name: 'statsSlice',
    initialState: initialState,
    reducers: {


    },
    extraReducers: {
        [getMyStats.fulfilled]: (state, action) => {
            state.loading = false
            state.stats = action.payload?.stats
            state.error = action?.payload?.error?.message || null
        },
        [getMyStats.pending]: (state, action) => {
            state.loading = true
        },
        [getMyStats.rejected]: (state, action) => {
            state.loading = false
        },

    }

})

export default statsSlice.reducer


