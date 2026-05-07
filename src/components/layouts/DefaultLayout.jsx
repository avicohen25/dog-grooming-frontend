import React from 'react';
import Header from '../partials/Header/Header';

export default ({ children }) => {
    return (
        <>
            <Header />
            <main> {children} </main>
        </>
    )
}