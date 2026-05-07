import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/navbar/AnnouncementBar';
import ScrollToTop from '../components/ScrollToTop';

const Mainlayout = () => {
    return (
        <div className=' dark:bg-slate-900 dark:text-white'>
            <ScrollToTop />
            <AnnouncementBar />
            <Navbar></Navbar>
            <Outlet></Outlet>
           <Footer></Footer>
        </div>
    );
};

export default Mainlayout;