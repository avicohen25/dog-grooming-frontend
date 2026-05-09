import { useEffect, useState } from "react";
import './popup.scss';

const Popup = (props) => {
    return (
        <div className={`popup-overlay ${props.isShow ? 'show' : ''}`}>
            <div className='popup'>
                <div className='popup-header'>
                    <div className='close-btn' onClick={() => props.onClose(false)}></div>
                    <div className='title'>{props.title}</div>
                </div>
                <div className='popup-content'> {props.children} </div>
            </div>
        </div>
    );
};

export default Popup;