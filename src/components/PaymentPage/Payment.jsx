import React from 'react';

import HeaderSearch from '../HomePage/HeaderSearch';
import SidebarTickets from '../SelectPassengers/SidebarTickets';
import PaymentMain from '../PaymentPage/PaymentMain';
import ProgressNav from '../MainPage/ProgressNav';


function Payment() {
    return (
        <div className="main-SearchTrain">
            <HeaderSearch className="nofirstpage-header" />
            <ProgressNav className="3" />
            <section className="main-centerSection">
                <div className="main-centerSection-in">
                    <SidebarTickets />
                    <PaymentMain />
                </div>
            </section>
        </div>
    );
};

export default Payment;