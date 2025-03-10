import React from 'react';

import HeaderSearch from '../HomePage/HeaderSearch';
import Sidebar from '../SearchTrainPage/Sidebar';
import SelectSeatsMain from '../SelectSeatsPage/SelectSeatsMain';
import ProgressNav from '../MainPage/ProgressNav';


function SelectSeats() {
    return (
        <div className="main-SearchTrain">
            <HeaderSearch className="nofirstpage-header" />
            <ProgressNav className="1" />
            <section className="main-centerSection">
                <div className="main-centerSection-in">
                    <Sidebar />
                    <SelectSeatsMain />
                </div>
            </section>
        </div>
    );
};

export default SelectSeats;