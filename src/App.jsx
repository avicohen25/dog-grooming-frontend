import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { customerInitAsync } from './store/dogGroomingAsyncThunk';

//layouts
import DefaultLayout from './components/layouts/DefaultLayout';
import EmptyLayout from './components/layouts/EmptyLayout';

//pages
import HomePage from './components/pages/HomePage/HomePage';
import LoginPage from './components/pages/LoginPage/LoginPage';

//shared
import Loader from './components/shared/Loader/Loader';
import ProtectedRoute from './components/partials/ProtectedRoute';


function App() {
    const isLoading = useSelector((state) => state.dogGrooming.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(customerInitAsync());
    }, [dispatch]);

    return (
        <div className="app">
            <Loader isLoading={isLoading} />

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DefaultLayout><ProtectedRoute><HomePage /></ProtectedRoute></DefaultLayout>} />
                    {/* <Route path="/" element={<DefaultLayout><HomePage /></DefaultLayout>} /> */}
                    <Route path="/login" element={<EmptyLayout><LoginPage /></EmptyLayout>} exact />
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default App;
