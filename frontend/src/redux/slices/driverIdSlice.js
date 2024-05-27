import { createSlice } from "@reduxjs/toolkit";

export const driverId = createSlice({
    name: "driverId",
    initialState:{
        driver_id:null,

    },
    reducers:{
        driverIdSetHandler: (state, action) => {
            state.driver_id=action.payload;
        }, 
        driverIdDeleteHandler: (state) => {
            state.driver_id = null;
        }
    }
});

export const { driverIdSetHandler, driverIdDeleteHandler } = driverId.actions;

export default driverId.reducer;