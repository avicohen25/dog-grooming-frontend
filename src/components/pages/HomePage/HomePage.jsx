import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Textbox from '../../shared/Textbox/Textbox';
import Popup from "../../shared/Popup/Popup";
import EditAppointment from "./partials/EditAppointment/EditAppointment";
import AppointmentDetails from "./partials/AppointmentDetails/AppointmentDetails";
import { getAppointmentsAsync, getAppointmentDataAsync, deleteAppointmentAsync } from '../../../store/dogGroomingAsyncThunk';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './HomePage.scss';

const HomePage = (props) => {
    const userId = useSelector((state) => state.dogGrooming.loginData?.userData?.id);
    const [groupedAppointments, setGroupedAppointments] = useState([]);
    const [isShowNewPopup, setIsShowNewPopup] = useState(false);
    const [isShowDetailsPopup, setIsShowDetailsPopup] = useState(false);
    const [appointmentId, setAppointmentId] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [userName, setUserName] = useState('');

    useEffect(() => {
        async function fetchData() {
            const data = {
                startDate: startDate,
                endDate: endDate,
                userName: userName
            };
            const res = await dispatch(getAppointmentsAsync(data));
            setGroupedAppointments(res.payload?.groupedAppointments);
        }
        fetchData();
    }, []);

    return (
        <div className='home-page-wrapper'>

            <div className='home-page'>

                <div className='appointments-header'>

                    <div className='filter-wrapper'>
                        <div className='field-wrapper'>
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => {
                                    setDateRange(update);
                                }}
                                isClearable={true}
                                placeholderText="בחר טווח תאריכים"
                                dateFormat="dd/MM/yyyy"
                                className="date-picker-input"
                            />
                        </div>
                        <div className='field-wrapper'>
                            <Textbox
                                value={userName}
                                error={''}
                                placeholder={'שם הלקוח'}
                                id='userName'
                                name='userName'
                                type='text'
                                maxLength='40'
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className='field-wrapper'>
                            <button type='button' onClick={handleOnFilter} className='btn-filter'>שלח</button>
                        </div>
                    </div>

                    <button type='button' onClick={handleOnNewAppointment} className='btn-new'>ליצירת תור חדש</button>
                </div>

                {
                    groupedAppointments?.map((group, index) => {
                        return (
                            <div key={index} className='date-wrapper'>
                                <div className='date-header'>
                                    <div className='date'>
                                        {group.date}
                                    </div>
                                </div>
                                <div className='appointments'>

                                    {
                                        group.appointments?.map((item, i) => {
                                            return (
                                                <div key={i} className='appointment-item'>
                                                    <div className='time'> {item.displayHaircutTime} </div>
                                                    <div className='name'> {item.firstName + ' ' + item.lastName} </div>
                                                    <div className='dog-type'> {item.haircutName + ' (' + item.durationMinutes + ' דקות)'} </div>
                                                    <div className='actions'>
                                                        {
                                                            userId == item.userId &&
                                                            <>
                                                                <button type='button' onClick={() => handleOnEdit(item)}>עריכה</button>
                                                                <button type='button' onClick={() => handleOnDelete(item)}>ביטול</button>
                                                                <button type='button' onClick={() => handleOnShowDetails(item)}>פרטים</button>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }

                                </div>
                            </div>
                        );
                    })
                }

                {
                    groupedAppointments.length == 0 &&
                    <div className='no-results'> אין תורים להצגה </div>
                }

            </div>

            <Popup onClose={() => setIsShowNewPopup(false)} isShow={isShowNewPopup} title=''>
                <EditAppointment appointmentId={appointmentId} onFinish={handleOnEditFinish} />
            </Popup>

            <Popup onClose={() => setIsShowDetailsPopup(false)} isShow={isShowDetailsPopup} title=''>
                <AppointmentDetails appointmentId={appointmentId} />
            </Popup>


        </div>
    );

    async function handleOnFilter() {
        const data = {
            startDate: startDate,
            endDate: endDate,
            userName: userName
        };
        const res = await dispatch(getAppointmentsAsync(data));
        setGroupedAppointments(res.payload?.groupedAppointments);
    }

    function handleOnNewAppointment() {
        setIsShowNewPopup(true);
        const data = { appointmentId: 0 };
        dispatch(getAppointmentDataAsync(data));
    }

    async function handleOnEditFinish() {
        setIsShowNewPopup(false);
        const data = {
            startDate: startDate,
            endDate: endDate,
            userName: userName
        };
        const res = await dispatch(getAppointmentsAsync(data));
        setGroupedAppointments(res.payload?.groupedAppointments);
    }

    function handleOnEdit(item) {
        setAppointmentId(item.id);
        setIsShowNewPopup(true);
        const data = { appointmentId: item.id };
        dispatch(getAppointmentDataAsync(data));
    }

    function handleOnShowDetails(item) {
        setAppointmentId(item.id);
        setIsShowDetailsPopup(true);
        const data = { appointmentId: item.id };
        dispatch(getAppointmentDataAsync(data));
    }

    async function handleOnDelete(item) {
        const result = await dispatch(deleteAppointmentAsync({ appointmentId: item.id }));
        if (result.payload?.isSuccess) {
            const data = {
                startDate: startDate,
                endDate: endDate,
                userName: userName
            };
            const res = await dispatch(getAppointmentsAsync(data));
            setGroupedAppointments(res.payload?.groupedAppointments);
        }
    }


};

export default HomePage;