import React, { useEffect } from 'react';

import HeaderSearch from './HeaderSearch';
import AboutUs from './AboutUs';
import HowItWorks from './HowItWorks';
import Feedbacks from './Feedbacks';


function Main() {
	useEffect(() => {
		const hash = window.location.hash; 
		if (hash) {
		  const element = document.querySelector(hash); 
		  if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		  }
		}
	  }, []);	
	return (

		<div className = "main">
			<HeaderSearch className="firstpage-header"/>
			<AboutUs/>
			<HowItWorks/>
			<Feedbacks/>
		</div>
	);
};

export default Main;