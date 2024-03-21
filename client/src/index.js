import React from 'react';
<<<<<<< HEAD
import {createRoot} from 'react-dom/client';

import App from './App';

/* createRoot(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
); */

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(<App />);
=======
import ReactDOM from 'react-dom/client'

import Header from './components/header';
import Hero from './components/hero';
import Main from './components/main';
import Footer from './components/footer';

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
>>>>>>> 6fd99c18e3c35c8f2f50c57cba1d9fe9bf6a496f
