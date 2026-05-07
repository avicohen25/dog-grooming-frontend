import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Config } from '../../../../Config';
import Textbox from '../../../shared/Textbox/Textbox';
import Button from '../../../shared/Button/Button';
import { registerAsync } from '../../../../store/dogGroomingAsyncThunk';
import { validateField, validateForm } from '../../../../helpers/validation';
import { Link } from "react-router-dom";

const RegisterForm = (props) => {
    const [formData, setFormData] = useState({
        firstName: { value: '', error: '', validationRules: { required: true, requiredMessage: 'אנא הזן שם פרטי', regexName: 'lettersOnlyRegex', regexMessage: 'שם פרטי אינו תקין' } },
        lastName: { value: '', error: '', validationRules: { required: true, requiredMessage: 'אנא הזן שם משפחה', regexName: 'lettersOnlyRegex', regexMessage: 'שם משפחה אינו תקין' } },
        email: { value: '', error: '', validationRules: { required: true, requiredMessage: 'אנא הזן דואר אלקטרוני', regexName: 'emailRegex', regexMessage: 'דואר אלקטרוני אינו תקין' } },
        password: { value: '', error: '', validationRules: { required: true, requiredMessage: 'אנא הזן סיסמא', regexName: 'lettersNumbersOnlyRegex', regexMessage: 'סיסמא אינה תקינה' } },
    });
    const [formError, setFormError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <form noValidate id='register-form' onSubmit={(e) => e.preventDefault()}>

            <div className='login-text'> משתמש חדש? הירשם </div>

            <div className='tabs-wrapper'>
                <a href='#' className='tab-item' onClick={(e) => handleSelectTab(e, 'login')}> כניסה </a>
                <a href='#' className='tab-item active' onClick={(e) => handleSelectTab(e, 'register')}> הרשמה </a>
            </div>

            <div className='form-wrapper'>

                <div className='row-wrapper'>
                    <Textbox
                        value={formData.firstName.value}
                        error={formData.firstName.error}
                        placeholder={'שם פרטי'}
                        id='firstName'
                        name='firstName'
                        type='text'
                        maxLength='30'
                        onChange={(e) => handleOnChange('firstName', e.target.value)}
                    />
                </div>

                <div className='row-wrapper'>
                    <Textbox
                        value={formData.lastName.value}
                        error={formData.lastName.error}
                        placeholder={'שם משפחה'}
                        id='lastName'
                        name='lastName'
                        type='text'
                        maxLength='30'
                        onChange={(e) => handleOnChange('lastName', e.target.value)}
                    />
                </div>

                <div className='row-wrapper'>
                    <Textbox
                        value={formData.email.value}
                        error={formData.email.error}
                        placeholder={'דואר אלקטרוני'}
                        id='email'
                        name='email'
                        type='email'
                        maxLength='40'
                        onChange={(e) => handleOnChange('email', e.target.value)}
                    />
                </div>

                <div className='row-wrapper'>
                    <Textbox
                        value={formData.password.value}
                        error={formData.password.error}
                        placeholder={'סיסמא'}
                        id='password'
                        name='password'
                        type='text'
                        maxLength='30'
                        onChange={(e) => handleOnChange('password', e.target.value)}
                    />
                </div>

                {
                    formError &&
                    <div className='error-message'> {formError} </div>
                }

                <div className='button-wrapper'>
                    <Button type={'submit'} text={'שלח'} onclick={() => handleOnContinue()}></Button>
                </div>

            </div>

        </form>
    );


    function handleSelectTab(e, tab) {
        e.preventDefault();
        props.onSelectPage(tab);
    }


    function handleOnChange(fieldName, value) {
        let data = formData;
        const error = validateField(data[fieldName].validationRules, value);
        data[fieldName].error = error;
        data[fieldName].value = value;
        setFormData({ ...data });
    }


    async function handleOnContinue() {
        const result = validateForm(formData);
        setFormData({ ...result.form });
        if (!result.isValid) { return; }

        setFormError('');

        const data = {
            firstName: formData.firstName.value,
            lastName: formData.lastName.value,
            email: formData.email.value,
            password: formData.password.value,
        };

        const res = await dispatch(registerAsync(data));

        if (!res.payload?.isSuccess) {
            setFormError('אירעה שגיאה, אנא נסה שוב');
            return;
        }

        localStorage.setItem('token', res.payload?.token);
        navigate("/");
    }

};

export default RegisterForm;