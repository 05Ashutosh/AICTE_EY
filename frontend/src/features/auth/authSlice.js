import {createSlice} from "@reduxjs/toolkit";

const initialState={
    isAuthenticated:true,
    user:null
}

// const reducer=(state,action)=>{}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login:(state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout:(state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;