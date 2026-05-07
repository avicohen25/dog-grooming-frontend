import { createSlice } from '@reduxjs/toolkit';
import { loginAsync, registerAsync, customerInitAsync, getAppointmentsAsync } from "./dogGroomingAsyncThunk";


const initialState = {
  isLoading: false,
  loginData: { isAuthentication: false, isAuthenticationFinish: false, userData: {} },
  groupedAppointments: [],
};

const dogGroomingSlice = createSlice({
  name: 'dogGrooming',
  initialState: initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setloginData: (state, action) => {
      state.loginData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loginData.isAuthenticationFinish = true;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loginData.isAuthenticationFinish = true;
      })
      .addCase(customerInitAsync.fulfilled, (state, action) => {
        state.loginData.isAuthenticationFinish = true;
      })
      .addCase(getAppointmentsAsync.fulfilled, (state, action) => {
        if (!action.payload?.groupedAppointments) { return; }
        state.groupedAppointments = action.payload.groupedAppointments;
      })
  }
});

export const { setIsLoading, setloginData } = dogGroomingSlice.actions;
export default dogGroomingSlice.reducer;