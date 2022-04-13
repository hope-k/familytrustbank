import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../axios';



export const getMyMessages = createAsyncThunk('/messages', async (_,{getState}) => {
    try {
        const state = getState()
        const token = state.auth?.token

        const { data } = await instance.get('/api/messages', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data
    } catch (err) {
        return err.response.data
    }
});









const initialState = {
    error: null,
    messages: [],

}

const messgaesSlice = createSlice({
    name: 'messgaesSlice',
    initialState: initialState,
    reducers: {


    },
    extraReducers: {
        [getMyMessages.fulfilled]: (state, action) => {
            state.loading = false
            state.messages = action.payload?.messages
            state.error = action?.payload?.error?.message || null
        },
        [getMyMessages.pending]: (state, action) => {
            state.loading = true
        },
        [getMyMessages.rejected]: (state, action) => {
            state.loading = false
        },

    }

})

export default messgaesSlice.reducer


