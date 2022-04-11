import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'


export const login = createAsyncThunk('/login', async (userObj) => {
    try {
        const { username, password } = userObj
        const { data } = await axios.post('/api/login', {
            username,
            password
        })
        return data
    } catch (err) {
        return err.response.data
    }
});









const initialState = {
    isAuthenticated: false,
    error: null,
    loading: false,
    user: null
    
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        resetAuthError: (state) => {
            state.error = null
        }

    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.loading = false
            state.isAuthenticated = action.payload?.isAuthenticated || false
            state.user = action.payload?.user
            state.error = action?.payload?.error?.message 
        },
        [login.pending]: (state, action) => {
            state.loading = true
        },
        [login.rejected]: (state, action) => {
            state.loading = false
        },

    }

})

export const { resetAuthError } = authSlice.actions
export default authSlice.reducer


