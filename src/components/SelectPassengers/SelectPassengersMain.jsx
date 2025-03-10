import { useNavigate } from 'react-router-dom';
import PassengersCard from "./PassengersCard";
import { useSelector } from "react-redux";
export default function SelectPassengersMain() {
    const navigate = useNavigate();
    const handleClickNextPage = (event) => { 
        event.preventDefault();
       // if (allCorrect) {navigate('/payment');}
        navigate('/payment');
    };

    const { seatsCount } = useSelector((state) => state.seats);
    const { passengers } = useSelector((state) => state.passengers);
    const correctCount = passengers.filter(passenger => passenger.correct === true).length;
    const allCorrect = correctCount === seatsCount.adult + seatsCount.child + seatsCount.baby;
    return (
        <div className="main-SelectPassengersMain">
            {Array.from({ length: seatsCount.adult + seatsCount.child  + seatsCount.baby}).map((_, i) => (
                <PassengersCard index={i} key={i} />
             ))}
            <div className="main-selectSeats-nextPage-container">
                <button type="button" className= {"main-selectSeats-nextPage-container-button" + (allCorrect ? "" : "incorrect")}
                    onClick={handleClickNextPage}  
                >
                    ДАЛЕЕ
                </button>
            </div>
        </div>
    );
}