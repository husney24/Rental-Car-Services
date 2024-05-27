import { createSlice } from "@reduxjs/toolkit";

export const userId = createSlice({
    name: "userId",
    initialState:{
        user_id:null,

    },
    reducers:{
        userIdSetHandler: (state, action) => {
            state.car_id=action.payload;
        }, 
        userIdDeleteHandler: (state) => {
            state.car_id = null;
        }
    }
});

export const { userIdSetHandler, userIdDeleteHandler } = userId.actions;

export default userId.reducer;