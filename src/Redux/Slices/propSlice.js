import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prop : null,
    stepNum : 1,
}

export const propSlice = createSlice({
    name: "prop",
    initialState,
    reducers: {
        setProp : (state,action)=>{
            state.prop = {
                ...state.prop,
                ...action.payload
            };
        },
        stepNum : (state,action)=>{
            state.stepNum=action.payload;
        },
        resetProp: (state)=>{
            state.prop = null;
        }
    }
});

export const { setProp, stepNum, resetProp} = propSlice.actions;
export default propSlice.reducer;
