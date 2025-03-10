import React from 'react';

import HeaderSearch from '../HomePage/HeaderSearch';
import Sidebar from '../SearchTrainPage/Sidebar';
import SearchTrainMain from '../SearchTrainPage/SearchTrainMain';
import ProgressNav from '../MainPage/ProgressNav';


function SecondPage() {
    return (
        <div className="main-SearchTrain">
            <HeaderSearch className="nofirstpage-header" />
            <ProgressNav className="1" />
            <section className="main-SearchTrain-centerSection">
                <div className="main-SearchTrain-centerSection-in">
                <Sidebar />
                <SearchTrainMain />
                </div>
            </section>
        </div>
    );
};

export default SecondPage;