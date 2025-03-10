import React from 'react';

import HeaderSearch from '../HomePage/HeaderSearch';
import SidebarTickets from '../SelectPassengers/SidebarTickets';
import CheckPageMain from '../CheckPage/CheckPageMain';
import ProgressNav from '../MainPage/ProgressNav';


function CheckPage() {
    return (
        <div className="main-SearchTrain">
            <HeaderSearch className="nofirstpage-header" />
            <ProgressNav className="4" />
            <section className="main-centerSection">
                <div className="main-centerSection-in">
                    <SidebarTickets />
                    <CheckPageMain />
                </div>
            </section>
        </div>
    );
};

export default CheckPage;