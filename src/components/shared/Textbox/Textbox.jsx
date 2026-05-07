import React from 'react';
import "./textbox.scss";

const Textbox = (props) => {
    return (
        <>
            <input className='textbox-general'
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                onKeyDown={handleOnKeyDown}
                onChange={handleOnChange}
                maxLength={props.maxLength}
                onCopy={handleOnCopy}
                onPaste={handleOnPaste}
                disabled={props.disabled}
            />
            {props.error && <div className='textbox-error'>{props.error}</div>}
        </>
    );

    function handleOnKeyDown(e) {
        if (props.onKeyDown) {
            props.onKeyDown(e);
        }
    }

    function handleOnChange(e) {
        if (props.onChange) {
            props.onChange(e);
        }
    }

    function handleOnCopy(e) {
        if (props.isDisabledCopy) {
            e.preventDefault()
            return false;
        }
        else {
            return true;
        }
    }

    function handleOnPaste(e) {
        if (props.isDisabledPaste) {
            e.preventDefault()
            return false;
        }
        else {
            return true;
        }
    }

};

export default Textbox;