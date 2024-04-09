import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import axios from 'axios';

import './App.css';

function CheckAuth() {
	axios.defaults.withCredentials = true;

	const [isRegistered, setIsRegistered] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		axios('http://localhost:8080/api/sessions')
			.then((res) => {
				if (res.data.statusCode == 200) {
					setIsRegistered(true);
					navigate('/');
				}
			})
			.catch((err) => alert(err));
	}, []);

	return isRegistered;
}

function App() {
	const isRegistered = CheckAuth();

	return (
		<>
			<header className='header'>
				<nav className='navbar'>
					<div className='navbar_container'>
						<a href={`/`} className='navbar_container-item'>
							HOME
						</a>
						<a
							href={`/register`}
							className='navbar_container-item'
							hidden={isRegistered}
							id='nav-register'
						>
							REGISTER
						</a>
						<a
							href={`/login`}
							className='navbar_container-item'
							hidden={isRegistered}
							id='nav-login'
						>
							LOGIN
						</a>
						<a
							href={`/form`}
							className='navbar_container-item'
							hidden={!isRegistered}
							id='nav-form'
						>
							FORM
						</a>
						<a
							href={`/orders`}
							className='navbar_container-item'
							hidden={!isRegistered}
							id='nav-orders'
						>
							ORDERS
						</a>
						<a
							href={`/signout`}
							className='navbar_container-item'
							hidden={!isRegistered}
							id='nav-signout'
						>
							SIGNOUT
						</a>
					</div>
				</nav>
			</header>

			<main className='main'>
				<Outlet />
			</main>

			<footer className='footer'>
				<p className='logo'>URANO</p>
			</footer>
		</>
	);
}

export default App;
