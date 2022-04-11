import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'



export const getMyMessages = createAsyncThunk('/messages', async () => {
    try {

        const { data } = await axios.get('/api/messages');
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


