import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../axios'

export const login = createAsyncThunk('/login', async (userObj) => {
    try {
        const { username, password } = userObj
        const { data } = await instance.post('/api/login', {
            username,
            password
        })
        return data
    } catch (err) {
        return err.response.data
    }
});









const initialState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') ? JSON.parse(localStorage.getItem('isAuthenticated')) : false,
    error: null,
    loading: false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    
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
            state.user = action.payload?.user || null
            state.error = action?.payload?.error?.message 

            localStorage.setItem('user', JSON.stringify(state.user))
            localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated))
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


