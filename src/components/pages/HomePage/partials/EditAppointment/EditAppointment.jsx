import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Button from '../../../../shared/Button/Button';
import Dropdown from "../../../../shared/Dropdown/Dropdown";
import { getAppointmentDataAsync, addAppointmentAsync, updateAppointmentAsync } from '../../../../../store/dogGroomingAsyncThunk';
import { validateField, validateForm } from '../../../../../helpers/validation';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './EditAppointment.scss';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const EditAppointment = (props) => {
    const isLoadingAppointmentData = useSelector((state) => state.dogGrooming.isLoadingAppointmentData);
    const appointmentData = useSelector((state) => state.dogGrooming.appointmentData);
    const haircutTypes = useSelector((state) => state.dogGrooming.appointmentData.haircutTypes);
    const availableSlots = useSelector((state) => state.dogGrooming.appointmentData.availableSlots);

    const [selectedDate, setSelectedDate] = useState(appointmentData.selectedDate);
    const [selectedHaircutType, setSelectedHaircutType] = useState(appointmentData.selectedHaircutType);
    const [selectedSlot, setSelectedSlot] = useState(appointmentData.selectedSlot);

    //console.info('availableSlots', availableSlots?.length);
    //console.info('isLoading', isLoading);

    const max = new Date();
    max.setDate(max.getDate() + 7);

    const [formData, setFormData] = useState({
        email: { value: '', error: '', validationRules: { required: true, requiredMessage: 'אנא הזן דואר אלקטרוני', regexName: 'emailRegex', regexMessage: 'דואר אלקטרוני אינו תקין' } },
        password: { value: '', error: '', validationRules: { required: true, requiredMessage: 'אנא הזן סיסמא', regexName: 'lettersNumbersOnlyRegex', regexMessage: 'סיסמא אינה תקינה' } },
    });
    const [formError, setFormError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedSlot(appointmentData.selectedSlot);
    }, [appointmentData.selectedSlot]);

    useEffect(() => {
        setSelectedDate(appointmentData.selectedDate);
    }, [appointmentData.selectedDate]);

    useEffect(() => {
        setSelectedHaircutType(appointmentData.selectedHaircutType);
    }, [appointmentData.selectedHaircutType]);

    return (
        <div className='edit-appointment-form'>

            <form noValidate id='appointment-form' onSubmit={(e) => e.preventDefault()}>

                <div className='title'> {props.appointmentId ? 'עדכון תור קיים' : 'יצירת תור חדש'} </div>

                <div className='form-wrapper'>

                    <div className='row-wrapper'>
                        {
                            isLoadingAppointmentData ? (
                                <Skeleton className='skeleton-field' />
                            ) : (

                                <DatePicker minDate={new Date()} maxDate={max} selected={selectedDate} dateFormat='dd/MM/yyyy' onChange={(date) => handleChangeDate(date)} />

                            )
                        }
                    </div>

                    <div className='row-wrapper'>
                        {
                            isLoadingAppointmentData ? (
                                <Skeleton className='skeleton-field' />
                            ) : (
                                <Dropdown
                                    placeholder={''}
                                    value={selectedHaircutType}
                                    onChange={(e) => handleChangeHaircutTypes(e)}
                                    options={haircutTypes}
                                ></Dropdown>
                            )
                        }
                    </div>

                    <div className='row-wrapper'>
                        {
                            isLoadingAppointmentData ? (
                                <Skeleton className='skeleton-field' />
                            ) : (
                                <Dropdown
                                    placeholder={''}
                                    value={selectedSlot}
                                    onChange={(e) => handleChangeSlot(e)}
                                    options={availableSlots}
                                ></Dropdown>
                            )
                        }
                    </div>

                    {
                        formError &&
                        <div className='error-message'> {formError} </div>
                    }

                    <div className='button-wrapper'>
                        {
                            isLoadingAppointmentData ? (
                                <Skeleton className='skeleton-btn' />
                            ) : (
                                <Button type={'submit'} text={'שלח'} onclick={() => handleOnContinue()}></Button>
                            )
                        }
                    </div>
                </div>

            </form>

        </div>
    );


    async function handleChangeDate(date) {
        setSelectedDate(date);

        const data = {
            appointmentId: props.appointmentId,
            haircutDate: date,
            haircutTypeId: selectedHaircutType
        };

        const res = await dispatch(getAppointmentDataAsync(data));
    }


    async function handleChangeHaircutTypes(e) {
        e.preventDefault();
        const value = parseInt(e.target.value);
        setSelectedHaircutType(value);

        const data = {
            appointmentId: props.appointmentId,
            haircutDate: selectedDate,
            haircutTypeId: value
        };

        const res = await dispatch(getAppointmentDataAsync(data));
    }


    function handleChangeSlot(e) {
        e.preventDefault();
        const slot = e.target.value;
        setSelectedSlot(slot);
    }


    function handleOnChange(fieldName, value) {
        let data = formData;
        const error = validateField(data[fieldName].validationRules, value);
        data[fieldName].error = error;
        data[fieldName].value = value;
        setFormData({ ...data });
    }


    async function handleOnContinue() {
        setFormError('');

        const data = {
            appointmentId: props.appointmentId,
            haircutDate: selectedDate,
            haircutTypeId: selectedHaircutType,
            selectedSlot: selectedSlot
        };

        const res = await dispatch(props.appointmentId ? updateAppointmentAsync(data) : addAppointmentAsync(data));

        if (!res.payload?.isSuccess) {
            setFormError('אירעה שגיאה, אנא נסה שוב');
            return;
        }

        props.onFinish();
    }

};

export default EditAppointment;