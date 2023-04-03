import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';
const Layout = () => {    
        return ( 
        <div id="martini-home">
                <div className="page-wrapper">
                        <Header />
                        <Outlet/>
                        <Footer />
                </div>
        </div>)
}
export default Layout;