import React from 'react';
import HeaderLast from '../SuccessPage/HeaderLast';
import SuccessPageMain from '../SuccessPage/SuccessPageMain';



function SuccessPage() {
    return (
        <div className="main-SearchTrain">
            <HeaderLast />
            <section className="main-centerSection">
                <div className="main-centerSection-in">
                    <SuccessPageMain />
                </div>
            </section>
        </div>
    );
};

export default SuccessPage;