import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAppointmentsAsync } from '../../../store/dogGroomingAsyncThunk';
import './HomePage.scss';

const HomePage = (props) => {
    const [groupedAppointments, setGroupedAppointments] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const res = await dispatch(getAppointmentsAsync());
            setGroupedAppointments(res.payload?.groupedAppointments);
        }
        fetchData();
    }, []);

    return (
        <div className='home-page-wrapper'>

            <div className='home-page'>

                {
                    groupedAppointments?.map((group, index) => {
                        return (
                            <div className='date-wrapper'>
                                <div className='date-header'>
                                    <div className='date'>
                                        {group.date}
                                    </div>
                                </div>
                                <div className='appointments'>

                                    {
                                        group.appointments?.map((item, index) => {
                                            return (
                                                <div className='appointment-item'>
                                                    <div className='time'> {item.displayHaircutTime} </div>
                                                    <div className='name'> דני לוי </div>
                                                    <div className='dog-type'> כלב קטן </div>
                                                    <div className='actions'>
                                                        <button type='button' onClick={() => handleOnEdit(item)}>עריכה</button>
                                                        <button type='button' onClick={() => handleOnDelete(item)}>ביטול</button>
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

            </div>

        </div>
    );

    function handleOnEdit(item) {
        console.info('handleOnEdit', item);
    }

    function handleOnDelete(item) {
        console.info('handleOnDelete', item);
    }

};

export default HomePage;