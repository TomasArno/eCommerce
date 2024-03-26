// import { useState } from 'react';
import Index from './components/main/index.jsx';

import './App.css';

function App() {
	return (
		<>
			<header className='header'>
				<nav className='navbar'>
					<div className='navbar_container'>
						<a className='navbar_container-item'>HOME</a>
						<a className='navbar_container-item' id='nav-register'>
							REGISTER
						</a>
						<a className='navbar_container-item' id='nav-login'>
							LOGIN
						</a>
						<a className='navbar_container-item' id='nav-form'>
							FORM
						</a>
						<a className='navbar_container-item' id='nav-orders'>
							ORDERS
						</a>
						<a className='navbar_container-item' id='nav-signout'>
							SIGNOUT
						</a>
					</div>
				</nav>
			</header>

			<main className='main'>
				<Index />
			</main>

			<footer className='footer'>
				<p className='logo'>URANO</p>
			</footer>
		</>
	);
}

export default App;
