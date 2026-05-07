import React from 'react';
import './Loader.scss';

const Loader = (props) => {
    return (
        <>
            {
                props.isLoading &&
                <>
                    <div className='loader-overlay'></div>
                    <div className='loader-wrapper'>
                        <div className='loader'></div>
                    </div>
                </>
            }
        </>
    );
};

export default Loader;