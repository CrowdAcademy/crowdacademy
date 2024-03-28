import React from 'react';
import ReactDOM from 'react-dom/client'
import Header from '../components/header';
import Hero from '../components/hero';
import Main from '../components/main';
import Footer from '../components/footer';
import './style.css'


function LandingPage() {
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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<LandingPage />
	</React.StrictMode>
);