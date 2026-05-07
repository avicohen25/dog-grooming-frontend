import React, { useEffect, useState } from "react";
import Textbox from '../../shared/Textbox/Textbox';
import Button from '../../shared/Button/Button';
import LoginForm from './partials/LoginForm';
import RegisterForm from './partials/RegisterForm';
import './LoginPage.scss';

const LoginPage = (props) => {
    const [page, setPage] = useState('login'); //login|register
    let currentView = null;

    switch (page) {
        case 'login':
            currentView = <LoginForm onSelectPage={handleSelectPage} />;
            break;
        case 'register':
            currentView = <RegisterForm onSelectPage={handleSelectPage} />;
            break;
    }

    return (
        <div className='login-page-wrapper'>
            <div className='login-page'>
                {currentView}
            </div>
        </div>
    );

    function handleSelectPage(page) {
        setPage(page);
    }
};

export default LoginPage;