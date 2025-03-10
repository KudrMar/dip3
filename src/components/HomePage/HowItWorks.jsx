import React from 'react';

export default function HowItWorks() {
    return (
        <section id="howItWorks" className="section-howItWorks">
            <div className="section-howItWorks-shadow">
            <div className="howItWorks-header">
                <div className="howItWorks-header-title">КАК ЭТО РАБОТАЕТ</div>
                <button className="howItWorks-header-button">Узнать больше</button>
            </div>
            <div className="howItWorks-list">
                <div className="howItWorks-item">
                    <div className="howItWorks-image howItWorks-image1"></div>
                    <p className="howItWorks-upperline">Удобный заказ на сайте</p>
                </div>
                
                <div className="howItWorks-item">
                    <div className="howItWorks-image howItWorks-image2"></div>
                    <p className="howItWorks-upperline">Нет необходимости ехать в офис</p>
                </div>
                <div className="howItWorks-item">
                    <div className="howItWorks-image howItWorks-image3"></div>
                    <p className="howItWorks-upperline">Огромный выбор направлений</p>
                </div>
            </div>
            </div>
        </section>
    )
}