import { createSlice } from '@reduxjs/toolkit';
import { loginAsync, registerAsync, customerInitAsync, getAppointmentsAsync, getAppointmentDataAsync } from "./dogGroomingAsyncThunk";


const initialState = {
  isLoading: false,
  isLoadingAppointmentData: false,
  loginData: { isAuthentication: false, isAuthenticationFinish: false, userData: {} },
  groupedAppointments: [],
  appointmentData: {
    selectedDate: null,
    haircutTypes: [],
    selectedHaircutType: 0,
    availableSlots: [],
    selectedSlot: ''
  }
};

const dogGroomingSlice = createSlice({
  name: 'dogGrooming',
  initialState: initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsLoadingAppointmentData: (state, action) => {
      state.isLoadingAppointmentData = action.payload;
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
      .addCase(getAppointmentDataAsync.fulfilled, (state, action) => {
        if (!action.payload) { return; }

        const keyValueTypes = action.payload.haircutTypes.map((item) => ({
          key: item.id,
          value: (item.name + ' - ' + item.durationMinutes + ' דקות')
        }));

        const keyValueSlots = action.payload.availableSlots.map((item) => ({
          key: item,
          value: item
        }));

        const appointmentData = {
          selectedDate: action.payload.selectedDate,
          haircutTypes: keyValueTypes,
          selectedHaircutType: action.payload.selectedHaircutType,
          availableSlots: keyValueSlots,
          selectedSlot: action.payload.selectedSlot
        }
        state.appointmentData = appointmentData;
      })
  }
});

export const { setIsLoading, setIsLoadingAppointmentData, setloginData } = dogGroomingSlice.actions;
export default dogGroomingSlice.reducer;