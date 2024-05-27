import { createSlice } from "@reduxjs/toolkit";

export const carId = createSlice({
    name: "carId",
    initialState:{
        car_id:null,

    },
    reducers:{
        carIdSetHandler: (state, action) => {
            state.car_id=action.payload;
        }, 
        carIdDeleteHandler: (state) => {
            state.car_id = null;
        }
    }
});

export const { carIdSetHandler, carIdDeleteHandler } = carId.actions;

export default carId.reducer;