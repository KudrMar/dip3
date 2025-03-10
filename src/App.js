import React from 'react';
import './App.css';
import './SearchTrainPage.css';
import './SelectSeatsPage.css';
import './SelectPassengers.css';
import './PaymentPage.css';
import './CheckPage.css';
import './SuccessPage.css';

import HomePage from './components/HomePage/HomePage';
import SearchTrain from './components/SearchTrainPage/SearchTrain';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/MainPage/Footer';
import HeaderLogo from './components/MainPage/HeaderLogo';
import { Provider } from "react-redux";
import store from './components/Redux/store'; 
import SelectSeats from './components/SelectSeatsPage/SelectSeats';
import SelectPassengers from './components/SelectPassengers/SelectPassengers';
import Payment from './components/PaymentPage/Payment';
import CheckPage from './components/CheckPage/CheckPage';
import SuccessPage from './components/SuccessPage/SuccessPage';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <HeaderLogo/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trains" element={<SearchTrain/>} />
        <Route path="/seats" element={<SelectSeats/>} />
        <Route path="/passengers" element={<SelectPassengers/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/check" element={<CheckPage/>} />
        <Route path="/success" element={<SuccessPage/>} />
        
        {/* <Route path="*" element={<NotFound />} /> */} 
      </Routes>
      <Footer/>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
