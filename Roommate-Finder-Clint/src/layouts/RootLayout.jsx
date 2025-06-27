import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet, useLocation } from 'react-router';
import Footer from '../pages/Footer';
import ThemeProvider from '../contexts/theme-provider';
import { useTheme } from '../hooks/use-theme';

const RootLayoutContent = () => {
    const { theme } = useTheme();
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');
    
    return (
        <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {!isDashboard && <Navbar></Navbar>}
            <Outlet></Outlet>
            {!isDashboard && <Footer></Footer>}
        </div>
    );
};

const RootLayout = () => {
    return (
        <ThemeProvider>
            <RootLayoutContent />
        </ThemeProvider>
    );
};

export default RootLayout;