import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading : false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading : (state, action) =>{
            state.loading = action.payload;
        },
        setUser : (state, action) =>{
            state.user = action.payload;
            localStorage.setItem("user",JSON.stringify(state.user));
        },
        setToken : (state, action) =>{
            state.token = action.payload;
            localStorage.setItem("token",JSON.stringify(state.token));
        },
    }
})

export const {setLoading, setUser, setToken} = userSlice.actions;
export default userSlice.reducer;