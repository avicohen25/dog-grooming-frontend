import { createAsyncThunk } from '@reduxjs/toolkit';
import ProviderManager from '../provider/ProviderManager';
import { setIsLoading, setIsLoadingAppointmentData, setloginData } from './dogGroomingSlice';


export const loginAsync = createAsyncThunk('dogGrooming/login', async (data, thunkAPI) => {
    try {
        thunkAPI.dispatch(setIsLoading(true));
        const state = thunkAPI.getState().dogGrooming;

        const params = {
            email: data.email,
            password: data.password
        };
        const res = await ProviderManager.getData('login', params);

        if (res?.isSuccess) {
            localStorage.setItem('token', res?.token);
            thunkAPI.dispatch(setloginData({ isAuthentication: true, userData: res?.user }));
        }

        return res;

    } catch (error) {
        console.info('error', error);
    } finally {
        thunkAPI.dispatch(setIsLoading(false));
    }
});


export const registerAsync = createAsyncThunk('dogGrooming/register', async (data, thunkAPI) => {
    try {
        thunkAPI.dispatch(setIsLoading(true));
        const state = thunkAPI.getState().dogGrooming;

        const params = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        };
        const res = await ProviderManager.getData('register', params);

        if (res?.isSuccess) {
            localStorage.setItem('token', res?.token);
            thunkAPI.dispatch(setloginData({ isAuthentication: true, userData: res?.user }));
        }

        return res;

    } catch (error) {
        console.info('error', error);
    } finally {
        thunkAPI.dispatch(setIsLoading(false));
    }
});



export const customerInitAsync = createAsyncThunk('dogGrooming/customerInit', async (data, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) { return; }

        thunkAPI.dispatch(setIsLoading(true));

        const params = {};
        const res = await ProviderManager.getData('customerInit', params);

        if (res?.isSuccess) {
            thunkAPI.dispatch(setloginData({ isAuthentication: true, userData: res?.user }));
        }

        return res;

    } catch (error) {
        localStorage.setItem('token', '');
        window.location.href = '/';
    } finally {
        thunkAPI.dispatch(setIsLoading(false));
    }
});


export const getAppointmentsAsync = createAsyncThunk('dogGrooming/getAppointments', async (data, thunkAPI) => {
    try {
        thunkAPI.dispatch(setIsLoading(true));
        const state = thunkAPI.getState().dogGrooming;

        const params = {};
        const res = await ProviderManager.getData('getAppointments', params);
        return res;

    } catch (error) {
        console.info('error', error);
    } finally {
        thunkAPI.dispatch(setIsLoading(false));
    }
});


export const getAppointmentDataAsync = createAsyncThunk('dogGrooming/getAppointmentData', async (data, thunkAPI) => {
    try {
        thunkAPI.dispatch(setIsLoadingAppointmentData(true));
        const state = thunkAPI.getState().dogGrooming;

        const params = {
            appointmentId: data.appointmentId,
            haircutDate: data.haircutDate,
            haircutTypeId: data.haircutTypeId
        };
        const res = await ProviderManager.getData('getAppointmentData', params);
        return res;

    } catch (error) {
        console.info('error', error);
    } finally {
        thunkAPI.dispatch(setIsLoadingAppointmentData(false));
    }
});


export const addAppointmentAsync = createAsyncThunk('dogGrooming/addAppointment', async (data, thunkAPI) => {
    try {
        thunkAPI.dispatch(setIsLoading(true));
        const state = thunkAPI.getState().dogGrooming;

        const params = {
            haircutTypeId: data.haircutTypeId,
            haircutDate: data.haircutDate,
            selectedSlot: data.selectedSlot
        };
        const res = await ProviderManager.getData('addAppointment', params);
        return res;

    } catch (error) {
        console.info('error', error);
    } finally {
        thunkAPI.dispatch(setIsLoading(false));
    }
});


export const updateAppointmentAsync = createAsyncThunk('dogGrooming/updateAppointment', async (data, thunkAPI) => {
    try {
        thunkAPI.dispatch(setIsLoading(true));
        const state = thunkAPI.getState().dogGrooming;

        const params = {
            appointmentId: data.appointmentId,
            haircutTypeId: data.haircutTypeId,
            haircutDate: data.haircutDate,
            selectedSlot: data.selectedSlot
        };
        const res = await ProviderManager.getData('updateAppointment', params);
        return res;

    } catch (error) {
        console.info('error', error);
    } finally {
        thunkAPI.dispatch(setIsLoading(false));
    }
});


export const deleteAppointmentAsync = createAsyncThunk('dogGrooming/deleteAppointment', async (data, thunkAPI) => {
    try {
        thunkAPI.dispatch(setIsLoading(true));
        const state = thunkAPI.getState().dogGrooming;

        const params = {
            appointmentId: data.appointmentId
        };
        const res = await ProviderManager.getData('deleteAppointment', params);
        return res;

    } catch (error) {
        console.info('error', error);
    } finally {
        thunkAPI.dispatch(setIsLoading(false));
    }
});



