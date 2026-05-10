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
import './AppointmentDetails.scss';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AppointmentDetails = (props) => {
    const groupedAppointments = useSelector((state) => state.dogGrooming.groupedAppointments);
    const appointment = groupedAppointments.flatMap(g => g.appointments).find(a => a.id == props.appointmentId);

    return (
        <div className='appointment-details'>

            <div className='title'> פרטי התור </div>

            <div className='row-wrapper'>
                <span> תאריך התור: </span> {appointment?.displayHaircutDate}
            </div>

            <div className='row-wrapper'>
                <span> שעה: </span> {appointment?.displayHaircutTime}
            </div>

            <div className='row-wrapper'>
                <span> שם הלקוח: </span> {appointment?.firstName + ' ' + appointment?.lastName}
            </div>

            <div className='row-wrapper'>
                <span> סוג תספורת: </span> {appointment?.haircutName + ' (' + appointment?.durationMinutes + ' דקות)'}
            </div>

            <div className='row-wrapper'>
                <span> מחיר: </span>
                <div className='price-wrapper'>
                    {
                        appointment?.totalAppointments > 3 ? (
                            <>
                                <div className='price'>{(appointment?.price * 0.9).toFixed(2)}</div><div className='nis'>₪</div>
                            </>
                        ) : (
                            <>
                                <div className='price'>{appointment?.price?.toFixed(2)}</div><div className='nis'>₪</div>
                            </>
                        )
                    }
                </div>
            </div>

            <div className='row-wrapper'>
                <span> תאריך יצירה: </span>
                {appointment?.createdDate ? new Date(appointment.createdDate).toLocaleDateString("he-IL") : ''}
            </div>


        </div>
    );

};

export default AppointmentDetails;