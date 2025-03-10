import React from 'react';

export default function Feedbacks() {
    return (
        <section id="feedbacks" className="feedbacks">
            <div className="feedbacks-header">ОТЗЫВЫ</div>
            <div className="feedbacks-list">
                <div className="feedback-item feedback-active">
                    <div className="feedback-image feedback-image1"></div>
                    <div className="feedback-content">
                        <div className="feedback-author">Екатерина Вальнова</div>
                        <p className="feedback-text">
                            Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.
                        </p>
                    </div>
                </div>
                <div className="feedback-item">
                    <div className="feedback-image feedback-image2"></div>
                    <div className="feedback-content">
                        <div className="feedback-author">Евгений Стрыкало</div>
                        <p className="feedback-text">
                            СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.
                        </p>
                    </div>
                </div>
            </div>
            <div className="feedbacks-dots-сontainer">
                <div className="feedbacks-dot feedbacks-dot-active"></div>
                <div className="feedbacks-dot"></div>
                <div className="feedbacks-dot"></div>
                <div className="feedbacks-dot"></div>
                <div className="feedbacks-dot"></div>
            </div>
        </section>
    );
}