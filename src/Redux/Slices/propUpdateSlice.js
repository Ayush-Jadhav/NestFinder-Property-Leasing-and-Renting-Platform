import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    propCardData : null
}

export const propUpdate = createSlice({
    name : "propUpdate",
    initialState,
    reducers: {
        setPropCardData: (state,action)=>{ 
            state.propCardData = action.payload;
        },
        resetPropCardData: (state,action)=>{
            state.propCardData = null;
        }
    }
});

export const {setPropCardData, resetPropCardData} = propUpdate.actions
export default propUpdate.reducer;