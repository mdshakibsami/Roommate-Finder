import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../pages/Footer';
import ThemeProvider from '../contexts/theme-provider';

const RootLayout = () => {
    return (
        <ThemeProvider>
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </ThemeProvider>
    );
};

export default RootLayout;