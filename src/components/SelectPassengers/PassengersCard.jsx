import React, { useState, useEffect  } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { InputMask } from "@react-input/mask";
import { passengersChange, passengersChangeFalse, passengersDel } from '../Redux/passengers';

export default function PassengersCard({ index }) {
    const { seatsCount } = useSelector((state) => state.seats);
    const [isCollapsedPas, setIsCollapsedPas] = useState(false);
   // const passengers = useSelector((state) => state.passengers.passengers);
    const dispatch = useDispatch();

    const handleCollapseClickPas = () => {
        setIsCollapsedPas((prev) => !prev);
    };

    const handleChangeType = (value) => {
        handleChange({ name: "is_adult", value, index })
        const document_type = value === "true" ? "Паспорт РФ" : "Свидетельство о рождении"
        handleChange({ name: "document_type", value: document_type, index })
    };

    const handleChangeText = (e) => {
        const { name, value } = e.target;
        handleChange({ name, value, index })
    };

    const handleChangeGender = (e) => {
        const { value } = e.target;
        const booleanValue = value === "true";
        handleChange({ name: "gender", value: booleanValue, index })
    };

    const handleChangeLimited = (e) => {
        const { value } = e.target;
        const booleanValue = !value;
        handleChange({ name: "limited", value: booleanValue, index })
    };

    const passengersLocal = useSelector((state) => state.passengers.passengersLocal);
    const [person_info, setPerson_info] = useState(passengersLocal);

    useEffect(() => {
        setPerson_info(passengersLocal);
    }, [passengersLocal]);

    // const initialPassenger = {
    //     "is_adult": "true",
    //     "first_name": "",
    //     "last_name": "",
    //     "patronymic": "",
    //     "gender": true,
    //     "birthday": "",
    //     "document_type": "Паспорт РФ",
    //     "document_data_s": "",
    //     "document_data_n": "",
    //     "limited": false,
    //     "warning": "",
    //     "correct": false,
    // };

    // const initialPassengers = Array.from({ length: seatsCount.adult + seatsCount.child }, () => ({
    //     ...initialPassenger
    // }));

    // const [person_info, setPerson_info] = useState(initialPassengers);

    const handleChange = ({ name, value, index }) => {
        setPerson_info((prevState) => {
            const updatedPassengers = [...prevState];
            updatedPassengers[index] = {
                ...updatedPassengers[index],
                [name]: value,
            };
            return updatedPassengers;
        });

    };

    const adultCount = person_info.filter(passenger => passenger.is_adult === "true").length;
    const childCount = person_info.filter(passenger => passenger.is_adult === "false").length;

    const onSubmit = (e) => {
        e.preventDefault();
        const updatedPassenger = {
            ...person_info[index],
            warning: "",
            correct: false,
        };

        if (person_info[index].first_name.length === 0) {
            updatedPassenger.warning = "Не заполнено имя"
        } else if (person_info[index].last_name.length === 0) {
            updatedPassenger.warning = "Не заполнена фамилия"
        } else if (person_info[index].birthday.length === 0) {
            updatedPassenger.warning = "Не заполнена дата рождения";
        } else if ((person_info[index].document_type === "Паспорт РФ") && (!/^\d{4}$/.test((person_info[index].document_data_s)))) {
            updatedPassenger.warning = "Серия паспорта должна содержать 4 цифры"
        } else if ((person_info[index].document_type === "Паспорт РФ") && (!/^\d{6}$/.test((person_info[index].document_data_n)))) {
            updatedPassenger.warning = "Номер паспорта должна содержать 6 цифры"
        } else if ((person_info[index].document_type === "Свидетельство о рождении") && (!/^[IVXLCDM]+-[А-Яа-я]{2}-\d{6}$/.test((person_info[index].document_data_n)))) {
            updatedPassenger.warning = "Номер свидетельства о рожденни указан некорректно Пример: VIII-ЫП-123456"
        } else if ((adultCount > seatsCount.adult) && (person_info[index]) ) {
            updatedPassenger.warning = "Заказано меньше взрослых билетов"
        } else if ((childCount > seatsCount.child  + seatsCount.baby) && (person_info[index]) ) {
            updatedPassenger.warning = "Заказано меньше детских билетов"
        } else {
            // updatedPassenger.warning =  ""
            // updatedPassenger.correct = true
            dispatch(passengersChange({ index, data: person_info}));
        };

        if (updatedPassenger.warning !== "") {setPerson_info((prevState) => {
            const updatedPassengers = [...prevState];
            updatedPassengers[index] = updatedPassenger;
            return updatedPassengers;
        });
        dispatch(passengersChangeFalse({ index, data: person_info, error: updatedPassenger.warning}));}
    
    };

    const resetPerson_info = (index) => {
        // setPerson_info((prevState) => {
        //     const updatedPassengers = [...prevState];
        //     updatedPassengers[index] = { ...initialPassenger }; 
        //     return updatedPassengers;
        // });
        dispatch(passengersDel({ index }));
    };


    return (
        <div className="main-SelectPassengersMain-passengerCard">
            <div className="main-SelectPassengersMain-passengerCard-top">
                <div className="main-SelectPassengersMain-passengerCard-top-left">
                    <div className={"main-SelectPassengersMain-passengerCard-top-colapse" + isCollapsedPas} onClick={handleCollapseClickPas}>
                    </div>
                    <div className="main-SelectPassengersMain-passengerCard-top-text">Пассажир {index + 1}</div>
                </div>
                <div className="main-SelectPassengersMain-passengerCard-top-del"onClick={() => resetPerson_info(index)}>
                </div>
            </div>

            {!isCollapsedPas && (
                <div className="main-SelectPassengersMain-passengerCard-containerover">
                    <div className="main-SelectPassengersMain-passengerCard-container">
                        <div className="main-SelectPassengersMain-passengerCard-type">
                            <select className="main-SelectPassengersMain-passengerCard-select"
                                name="type_is_adult"
                                value={person_info[index].is_adult}
                                onChange={(e) => handleChangeType(e.target.value)}
                                disabled={person_info[index].correct}
                            >
                                <option value="true">Взрослый</option>
                                <option value="false">Детский</option>
                            </select>
                        </div>
                        <div className="main-SelectPassengersMain-passengerCard-name">
                            <div className="main-SelectPassengersMain-passengerCard-name-surname main-SelectPassengersMain-third">
                                <div className="main-SelectPassengersMain-passengerCard-name-surname-text main-SelectPassengersMain-label"
                                >Фамилия
                                </div>
                                <input className="main-SelectPassengersMain-passengerCard-name-surname-input main-SelectPassengersMain-passengerCard-input"
                                    type="text"
                                    name="last_name"
                                    value={person_info[index].last_name}
                                    onChange={handleChangeText}
                                        disabled={person_info[index].correct}>
                                </input>
                            </div>
                            <div className="main-SelectPassengersMain-passengerCard-name-name main-SelectPassengersMain-third">
                                <div className="main-SelectPassengersMain-passengerCard-name-name-text main-SelectPassengersMain-label">Имя
                                </div>
                                <input className="main-SelectPassengersMain-passengerCard-name-name-input main-SelectPassengersMain-passengerCard-input"
                                    type="text"
                                    name="first_name"
                                    value={person_info[index].first_name}
                                    onChange={handleChangeText}
                                        disabled={person_info[index].correct}>
                                </input>
                            </div>
                            <div className="main-SelectPassengersMain-passengerCard-name-patronymic main-SelectPassengersMain-third">
                                <div className="main-SelectPassengersMain-passengerCard-name-patronymic-text main-SelectPassengersMain-label">Отчество
                                </div>
                                <input className="main-SelectPassengersMain-passengerCard-name-patronymic-input main-SelectPassengersMain-passengerCard-input"
                                    type="text"
                                    name="patronymic"
                                    value={person_info[index].patronymic}
                                    onChange={handleChangeText}
                                        disabled={person_info[index].correct}>
                                </input>
                            </div>
                        </div>
                        <div className="main-SelectPassengersMain-passengerCard-sex">
                            <div className="main-SelectPassengersMain-passengerCard-sex-sex">
                                <div className="main-SelectPassengersMain-passengerCard-sex-sex-text main-SelectPassengersMain-label">Пол
                                </div>
                                <div className="main-SelectPassengersMain-passengerCard-inputrow">
                                    <div className={"main-SelectPassengersMain-passengerCard-sex-sex-input-M" + person_info[index].gender + " main-SelectPassengersMain-passengerCard-input"}
                                        onClick={() => handleChangeGender({ target: { value: "true" } })}
                                        disabled={!person_info[index].correct}
                                    >М
                                        {/* // htmlFor={`genderm${index}`}>М */}
                                        {/* <input
                                    type="radio"
                                    name={"genderm" + index}
                                    value="true"
                                    checked={person_info[index].gender === true}
                                    onChange={handleChangeGender}
                                    style={{ display: "none" }}>
                                </input> */}
                                    </div>
                                    <div className={"main-SelectPassengersMain-passengerCard-sex-sex-input-F" + !person_info[index].gender + " main-SelectPassengersMain-passengerCard-input"}
                                        onClick={() => handleChangeGender({ target: { value: "false" } })}
                                        disabled={person_info[index].correct}
                                    >
                                        Ж
                                        {/* // htmlFor={`genderf${index}`}>Ж */}
                                        {/* <input
                                    type="radio"
                                    name={"genderf" + index}
                                    value="false"
                                    checked={person_info[index].gender === false}
                                    onChange={handleChangeGender}
                                    style={{ display: "none" }}>
                                </input> */}
                                    </div>
                                </div>
                            </div>
                            <div className="main-SelectPassengersMain-passengerCard-sex-birthday">
                                <div className="main-SelectPassengersMain-passengerCard-sex-name-birthday main-SelectPassengersMain-label">Дата рождения
                                </div>
                                {/* <InputMask className={"main-SelectPassengersMain-passengerCard-sex-name-birthday main-SelectPassengersMain-passengerCard-input"}
                                    type="text"
                                    name="birthday"
                                    value={person_info[index].birthday}
                                    onChange={handleChangeText}
                                    placeholder="ДД/ММ/ГГ"
                                    mask="99/99/99">
                                </InputMask> */}
                                <InputMask className={"main-SelectPassengersMain-passengerCard-sex-name-birthday main-SelectPassengersMain-passengerCard-input"}
                                    type="text"
                                    name="birthday"
                                    value={person_info[index].birthday}
                                    onChange={handleChangeText}
                                    placeholder="ДД/ММ/ГГ"
                                    mask="dd/mm/yy"
                                    replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
                                    disabled={person_info[index].correct}
                                />
                            </div>
                        </div>
                        <div className="main-SelectPassengersMain-passengerCard-limited">
                            <div className={"main-SelectPassengersMain-passengerCard-limited-checkbox" + person_info[index].limited}
                                onClick={() => handleChangeLimited({ target: { value: person_info[index].limited } })}
                                disabled={!person_info[index].correct}>
                            </div>
                            <div className="main-SelectPassengersMain-passengerCard-limited-text">
                                ограниченная подвижность
                            </div>
                        </div>

                        <div className="main-SelectPassengersMain-passengerCard-line">
                        </div>

                        <div className="main-SelectPassengersMain-passengerCard-certificate">
                            <div className="main-SelectPassengersMain-passengerCard-certificate-third">
                                <div className="main-SelectPassengersMain-passengerCard-certificate-type-text main-SelectPassengersMain-label">Тип документа
                                </div>
                                <div className="main-SelectPassengersMain-passengerCard-certificate-type-input main-SelectPassengersMain-passengerCard-input">
                                    {person_info[index].document_type}
                                </div>
                            </div>
                            {person_info[index].is_adult === 'true' && (<div className="main-SelectPassengersMain-passengerCard-certificate-third">
                                <div className="main-SelectPassengersMain-passengerCard-certificate-series-text main-SelectPassengersMain-label">Серия
                                </div>
                                <input className="main-SelectPassengersMain-passengerCard-certificate-series-input main-SelectPassengersMain-passengerCard-input"
                                    type="text"
                                    name="document_data_s"
                                    value={person_info[index].document_data_s}
                                    onChange={handleChangeText}
                                    disabled={person_info[index].correct}>
                                </input>
                            </div>)}
                            <div className="main-SelectPassengersMain-passengerCard-certificate-third">
                                <div className="main-SelectPassengersMain-passengerCard-certificate-number-text main-SelectPassengersMain-label">Номер
                                </div>
                                <input className="main-SelectPassengersMain-passengerCard-certificate-number-input main-SelectPassengersMain-passengerCard-input"
                                    type="text"
                                    name="document_data_n"
                                    value={person_info[index].document_data_n}
                                    onChange={handleChangeText}
                                    disabled={person_info[index].correct}>
                                </input>
                            </div>
                        </div>


                    </div>
                    <div className={"main-SelectPassengersMain-passengerCard-incorrectly" + (person_info[index].correct ? "green" : (person_info[index].warning === "" ? "white" : "red"))}>
                        <div className="main-SelectPassengersMain-passengerCard-incorrectly-left">
                            <div className="main-SelectPassengersMain-passengerCard-incorrectly-cross">
                            </div>
                            <div className="main-SelectPassengersMain-passengerCard-incorrectly-text">{person_info[index].warning}
                            </div>
                        </div>
                        <button type="button" className="main-SelectPassengersMain-passengerCard-incorrectly-button" onClick={onSubmit}>Следующий пассажир
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}