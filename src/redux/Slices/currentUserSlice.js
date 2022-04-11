import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../axios';


export const getCurrentUser = createAsyncThunk('/currentUser', async () => {
    try {
        const { data } = await instance.get('/api/me')
        return data
    } catch (err) {
        return err.response.data
    }
});
export const logout = createAsyncThunk('/logout', async () => {
    try {
        const { data } = await instance.post('/api/logout')
        return data
    } catch (err) {
        return err.response.data
    }
});






const initialState = {
    user: null,
    loading: true,
    isAuthenticated: false,
}

const currentUserSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {

    },
    extraReducers: {
        [getCurrentUser.fulfilled]: (state, action) => {
            state.user = action?.payload?.user
            state.isAuthenticated = action?.payload?.isAuthenticated || false
            state.loading = false
        }, 
        [getCurrentUser.pending]: (state, action) => {
            state.loading = true
        }, 
        [getCurrentUser.rejected]: (state, action) => {
            state.loading = false
        },
        [logout.fulfilled]: (state, action) => {
            state.isAuthenticated = action.payload?.success && false
            
        }
    }

})

export default currentUserSlice.reducer


