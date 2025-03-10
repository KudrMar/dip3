import React, { useState, useEffect, useCallback  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userChange } from '../Redux/passengers';
import { InputMask } from "@react-input/mask";
export default function PaymentMain() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClickNextPage = (event) => {
        event.preventDefault();
        if (validateForm()) {
            dispatch(userChange({data: formData}));
            navigate('/check');
        } else {
            validateFormSet()
        }
        // dispatch(userChange({data: formData}));
        // navigate('/check');
    };

    const handlePaymentOnline = (e) => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState, 
            payment_method: value, 
        }));
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target; 

        setFormData((prevState) => ({
            ...prevState, 
            [id]: value, 
        }));
    };

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        patronymic: "",
        phone: "",
        email: "",
        payment_method: "online"
    });



    const [errors, setErrors] = useState({});

    const validateFormSet = () => {
        const newErrors = {};

        if (!formData.first_name) {
            newErrors.first_name = "Имя обязательно для заполнения";
        }

        if (!formData.last_name) {
            newErrors.last_name = "Фамилия обязательна для заполнения";
        }

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Введите корректный email";
        }
        
        if (!formData.phone || !/^\+7\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Введите корректный телефон";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    }

    const validateForm = useCallback(() => {
        const newErrors = {};

        if (!formData.first_name) {
            newErrors.first_name = "Имя обязательно для заполнения";
        }

        if (!formData.last_name) {
            newErrors.last_name = "Фамилия обязательна для заполнения";
        }

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Введите корректный email";
        }

        if (!formData.phone || !/^\+7 \d{3} \d{3} \d{2} \d{2}$/.test(formData.phone)) {
            newErrors.phone = "Введите корректный телефон";
        }

        return Object.keys(newErrors).length === 0; 
    }, [formData]);

    useEffect(() => {
        validateForm();
    }, [formData, validateForm]);
    
    return (
        <div className="main-SelectPassengersMain">

            <div className="main-SelectPassengersMain-passengerCard">
                <div className="main-SelectPassengersMain-passengerCard-top">

                    <div className="main-SelectPassengersMain-passengerCard-top-text">Персональные данные</div>

                </div>
            
                <div className="main-Payment-container">

                    <div className="main-SelectPassengersMain-passengerCard-name">
                        <div className="main-SelectPassengersMain-passengerCard-name-surname main-SelectPassengersMain-third">
                            <div className="main-SelectPassengersMain-passengerCard-name-surname-text main-Payment-email-label">Фамилия
                            </div>
                            <input id="last_name" 
                            className={"main-SelectPassengersMain-passengerCard-name-surname-input main-SelectPassengersMain-passengerCard-input" + 
                            (errors.last_name ? " cssErrorInput" : "" )}
                            value={formData.last_name}
                            onChange={handleInputChange}>
                            </input>
                        </div>
                        <div className="main-SelectPassengersMain-passengerCard-name-name main-SelectPassengersMain-third">
                            <div className="main-SelectPassengersMain-passengerCard-name-name-text main-Payment-email-label">Имя
                            </div>
                            <input id="first_name" 
                            className={"main-SelectPassengersMain-passengerCard-name-name-input main-SelectPassengersMain-passengerCard-input"  +
                            (errors.first_name ? " cssErrorInput" : "" )}
                            value={formData.first_name}
                            onChange={handleInputChange}>
                            </input>
                        </div>
                        <div className="main-SelectPassengersMain-passengerCard-name-patronymic main-SelectPassengersMain-third">
                            <div className="main-SelectPassengersMain-passengerCard-name-patronymic-text main-Payment-email-label">Отчество
                            </div>
                            <input id="patronymic" 
                            className={"main-SelectPassengersMain-passengerCard-name-patronymic-input main-SelectPassengersMain-passengerCard-input" +
                            (errors.patronymic ? " cssErrorInput" : "" ) }
                            value={formData.patronymic}
                            onChange={handleInputChange}>
                            </input>
                        </div>
                    </div>

                    <div className="main-Payment-tel main-Payment-40">
                        <div className="main-Payment-tel-label">Контактный телефон
                        </div>
                        <InputMask id="phone" className={"main-Payment-tel-input main-SelectPassengersMain-passengerCard-input" +
                        (errors.phone ? " cssErrorInput" : "" ) }
                        placeholder = "+7 ___ ___ __ __"
                        value={formData.phone}
                        mask="+7 ___ ___ __ __"
                        replacement={{ _: /\d/ }}
                        onChange={handleInputChange}>
                            
                        </InputMask>
                    </div>

                    <div className="main-Payment-email main-Payment-40">
                        <div className="main-Payment-email-label">E-mail
                        </div>
                        <input id="email" className={"main-Payment-email-input main-SelectPassengersMain-passengerCard-input" +
                        (errors.email ? " cssErrorInput" : "" ) }
                        placeholder = "inbox@gmail.ru"
                        value={formData.email}
                        onChange={handleInputChange}>
                        </input>
                    </div>
                </div>

                <div className="main-SelectPassengersMain-passengerCard-top">

                    <div className="main-SelectPassengersMain-passengerCard-top-text">Способ оплаты</div>

                </div>

                <div className="main-Payment-container">

                    <div className="main-SelectPassengersMain-passengerCard-limited">
                        <div className={"main-SelectPassengersMain-passengerCard-limited-checkbox" + (formData.payment_method === "online")}
                        onClick={() => handlePaymentOnline({ target: { value: "online" } })}>
                        </div>
                        <div className={"main-Payment-checkbox-text" + (formData.payment_method === "online" ? " cssColorYelow":" cssColorGrey")}>
                            Онлайн
                        </div>
                    </div>

                    <div className="main-SelectPassengersMain-passengerCard-limited">
                        <div className="main-SelectPassengersMain-passengerCard-name-surname main-SelectPassengersMain-third">
                            <div className="main-SelectPassengersMain-labelBold">Банковской картой
                            </div>

                        </div>
                        <div className="main-SelectPassengersMain-passengerCard-name-name main-SelectPassengersMain-third">
                            <div className="main-SelectPassengersMain-labelBold">PayPal
                            </div>

                        </div>
                        <div className="main-SelectPassengersMain-passengerCard-name-patronymic main-SelectPassengersMain-third">
                            <div className="main-SelectPassengersMain-labelBold">Visa QIWI Wallet
                            </div>

                        </div>
                    </div>
                    <div className="main-SelectPassengersMain-passengerCard-line">
                    </div>
                    <div className="main-SelectPassengersMain-passengerCard-limited">
                        <div className={"main-SelectPassengersMain-passengerCard-limited-checkbox"  + (formData.payment_method === "cash")}
                        onClick={() => handlePaymentOnline({ target: { value: "cash" } })}>
                        </div>
                        <div className={"main-Payment-checkbox-text" + (formData.payment_method === "cash" ? " cssColorYelow":" cssColorGrey")} >
                            Наличными
                        </div>
                    </div>
                </div>
            </div>




            <div className="main-selectSeats-nextPage-container">
                <button type="button" className={"main-selectSeats-nextPage-container-button" +  (validateForm() === true ? "":"incorrect")}
                    onClick={handleClickNextPage}>
                    КУПИТЬ БИЛЕТЫ
                </button>
            </div>
        </div >
    );
}