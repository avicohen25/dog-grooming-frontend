import React from "react";
import "./Button.scss";

const Button = (props) => {
    return (
        <button onClick={props.onclick} className='btn-general' disabled={props.disabled} type={props.type ? props.type : null}>{props.text}</button>
    );
};

export default Button;