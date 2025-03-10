import React, { useState  } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from 'react-redux';
import { filterChange } from '../Redux/filter';
const SliderBar = () => {
    const dispatch = useDispatch();
    const { price_from, price_to } = useSelector((state) => state.filter);

    //const initialValues = useRef([price_from, price_to]);

    const [priceRange, setPriceRange] = useState([price_from, price_to]);


    const handleSliderChange = (valuePrices) => {
        setPriceRange(valuePrices);
        dispatch(filterChange({ name: 'price_from', value: valuePrices[0] }));
        dispatch(filterChange({ name: 'price_to', value: valuePrices[1] }));
    };

    return (
        <div className="sidebar-searchtickets-parammenu-price-slider">
            <Slider
                range
                min={0}
                max={10000} 
                value={priceRange} 
                onChange={handleSliderChange} 
                handleStyle={{
                    height: "24px",
                    width: "24px",
                    backgroundColor: "#FFFFFF",
                    border:"none",
                    opacity: "1",
                    marginTop: "-2px"
                  }} 
                  trackStyle={{ backgroundColor: "#FFA800",
                    height: "19px"
                   }}
                   railStyle={{ backgroundColor: "#3E3C41",
                    border: "1px solid #C4C4C4",
                    height: "19px",
                    borderRadius: "8px"
                    }}
                  
                
            />
            <div className="sidebar-searchtickets-parammenu-prices-values" >
                <span style={{ position: "absolute", transform: "translateX(-50%)", left: "0%" }}>{0}</span> 
                <span style={{ position: "absolute", transform: "translateX(-50%)", left: `${(priceRange[0] / 10000) * 100}%` }}>{priceRange[0]}</span>
                <span style={{ position: "absolute", transform: "translateX(-50%)", left: `${(priceRange[1] / 10000) * 100}%` }}>{priceRange[1]}</span>
                <span style={{ position: "absolute", transform: "translateX(-50%)", left: "100%" }}>{10000}</span>
            </div>
        </div>


    );
};

export default SliderBar;
