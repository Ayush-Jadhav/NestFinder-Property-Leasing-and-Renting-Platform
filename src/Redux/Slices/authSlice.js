import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signUpData : null,
    loading : false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setSignupData: (state,action)=>{
            state.signUpData = action.payload;
        },
        setLoading: (state,action)=>{
            state.loading = action.payload;
        }
    }
});

export const {setLoading, setSignupData} = authSlice.actions;
export default authSlice.reducer;