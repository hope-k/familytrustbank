import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../axios';



//export const logout = createAsyncThunk('/logout', async () => {
//    try {
//        const { data } = await instance.post('/api/logout')
//        console.log(data)
//
//        return data
//    } catch (err) {
//        return err.response.data
//    }
//});






const initialState = {
    loggedOut: null
}

const currentUserSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {

    },
    extraReducers: {
    
        //[logout.fulfilled]: (state, action) => {
        //    state.loggedOut = action.payload?.success
        //    
        //}
    }

})

export default currentUserSlice.reducer


