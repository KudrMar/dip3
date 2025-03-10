import React, { useState  } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from 'react-redux';
import { filterChange } from '../Redux/filter';
const SliderBarTime = ({ param }) => {
    const {fromHour, toHour } = param; 
    const dispatch = useDispatch();
    const stateFrom  = useSelector((state) => state.filter[fromHour]);
    const stateTo = useSelector((state) => state.filter[toHour]);

    const [stateRange, setPriceRange] = useState([stateFrom, stateTo]);

    const handleSliderChange = (valuesState) => {
        setPriceRange(valuesState);
        dispatch(filterChange({ name: [fromHour], value: Math.floor(valuesState[0])}));
        dispatch(filterChange({ name: [toHour], value: Math.floor(valuesState[1])}));
    };

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    };

    return (
        <div className="sidebar-searchtickets-parammenu-to-slider">
            <Slider
                range
                min = {0}
                max= {1440}
                value={stateRange} 
                onChange={handleSliderChange}
                handleStyle={{
                    height: "18px",
                    width: "18px",
                    backgroundColor: "#FFFFFF",
                    border:"none",
                    opacity: "1",
                    marginTop: "-3px"
                  }} 
                  trackStyle={{ backgroundColor: "#FFA800",
                    height: "10px"
                   }}
                   railStyle={{ backgroundColor: "#3E3C41",
                    border: "1px solid #C4C4C4",
                    height: "10px",
                    borderRadius: "8px"
                    }}
            />
            <div className="sidebar-searchtickets-parammenu-prices-values" >
                <span style={{ position: "absolute", transform: "translateX(-50%)", left: "0%" }}>{formatTime(0)}</span> 
                <span style={{ position: "absolute", transform: "translateX(-50%)", left: `${(stateRange[0] / 1440) * 100}%` }}>{formatTime(stateRange[0])}</span>
                <span style={{ position: "absolute", transform: "translateX(-50%)", left: `${(stateRange[1] / 1440) * 100}%` }}>{formatTime(stateRange[1])}</span>
                <span style={{ position: "absolute", transform: "translateX(-50%)", left: "100%" }}>{formatTime(1440)}</span>
            </div>
        </div>


    );
};

export default SliderBarTime;
