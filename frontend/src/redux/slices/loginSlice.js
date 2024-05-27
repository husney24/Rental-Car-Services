import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const loginStage = createSlice({
  name: "loginStage",
  initialState,
  reducers: {
    loginHandler: (state, action) => {
      console.log(action);
      state.token = action.payload;
    },
    logoutHandler: (state) => {
      state.token = null;
    },
  },
});

export const { loginHandler, logoutHandler } = loginStage.actions;

export default loginStage.reducer;

// useDispatch, useSelector
