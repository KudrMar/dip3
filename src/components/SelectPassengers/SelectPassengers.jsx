
import React from 'react';

import HeaderSearch from '../HomePage/HeaderSearch';
import SidebarTickets from '../SelectPassengers/SidebarTickets';
import SelectPassengersMain from '../SelectPassengers/SelectPassengersMain';
import ProgressNav from '../MainPage/ProgressNav';


function SelectPassengers() {
    return (
        <div className="main-SearchTrain">
        <HeaderSearch className="nofirstpage-header" />
        <ProgressNav className="2" />
         <section className="main-centerSection">
            <div className="main-centerSection-in">
                <SidebarTickets />
                <SelectPassengersMain />
            </div>
        </section> 
       </div>
    );
};

export default SelectPassengers;