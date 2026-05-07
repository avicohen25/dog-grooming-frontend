import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = (props) => {
    const userData = useSelector((state) => state.dogGrooming.loginData.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <header>
            <div className="user-name"> {userData.firstName && <> שלום, {userData.firstName + ' ' + userData.lastName} <a href='#' onClick={(e) => handleOnLogoutClick(e)}>התנתק</a> </>} </div>
            <div className="project-name"> DogGrooming </div>
        </header>
    );

    function handleOnLogoutClick(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

};

export default Header;