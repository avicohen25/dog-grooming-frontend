import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Textbox from '../../../shared/Textbox/Textbox';
import Button from '../../../shared/Button/Button';
import { loginAsync } from '../../../../store/dogGroomingAsyncThunk';
import { validateField, validateForm } from '../../../../helpers/validation';
import { Link } from "react-router-dom";

const LoginForm = (props) => {
    const [formData, setFormData] = useState({
        email: { value: '', error: '', validationRules: { required: true, requiredMessage: 'אנא הזן דואר אלקטרוני', regexName: 'emailRegex', regexMessage: 'דואר אלקטרוני אינו תקין' } },
        password: { value: '', error: '', validationRules: { required: true, requiredMessage: 'אנא הזן סיסמא', regexName: 'lettersNumbersOnlyRegex', regexMessage: 'סיסמא אינה תקינה' } },
    });
    const [formError, setFormError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <form noValidate id='login-form' onSubmit={(e) => e.preventDefault()}>

            <div className='login-text'> משתמש קיים? התחבר </div>

            <div className='tabs-wrapper'>
                <a href='#' className='tab-item active' onClick={(e) => handleSelectTab(e, 'login')}> כניסה </a>
                <a href='#' className='tab-item' onClick={(e) => handleSelectTab(e, 'register')}> הרשמה </a>
            </div>

            <div className='form-wrapper'>

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
                        type='password'
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
            email: formData.email.value,
            password: formData.password.value
        };

        const res = await dispatch(loginAsync(data));

        if (!res.payload?.isSuccess) {
            setFormError('אירעה שגיאה, אנא נסה שוב');
            return;
        }

        navigate("/");
    }

};

export default LoginForm;