import React from 'react';

import Header from '../../components/header';
import Hero from '../../components/hero';
import Main from '../../components/main';
import Footer from '../../components/footer';

import './landingPage.css'


export default function LandingPage() {
	return(
		<div>
			<Header />
			<Hero />
			<hr className = "hr-1"></hr>
            <Main />
			<hr className = "hr-4"></hr>
            <Footer />
			<hr className = "hr-5"></hr>
		</div>
	)
}

