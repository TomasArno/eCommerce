import { useEffect } from 'react';
import { Outlet } from "react-router-dom";

import axios from 'axios';

import './App.css';

function CheckLogin() {
	useEffect(() => {
		axios({
			method: 'post',
			url: 'http://localhost:8080/api/sessions/login',
			data: {
				email: "tomasio",
				password: "tomasio",
				name: "tomasio"
			}
		}, { withCredentials: true })
			.then(() => {
				document.cookie = "token=123";
			}
			)
			.catch((err) => console.log(err));
	}, []);
}

function App() {
	CheckLogin()

	return (
		<>
			<header className='header'>
				<nav className='navbar'>
					<div className='navbar_container'>
						<a href={`/`} className='navbar_container-item'>HOME</a>
						<a href={`/register`} className='navbar_container-item' hidden={document.cookie.includes("123")} id='nav-register'>
							REGISTER
						</a>
						<a href={`/login`} className='navbar_container-item' hidden={document.cookie.includes("123")} id='nav-login'>
							LOGIN
						</a>
						<a href={`/form`} className='navbar_container-item' hidden={!document.cookie.includes("123")} id='nav-form'>
							FORM
						</a>
						<a href={`/orders`} className='navbar_container-item' hidden={!document.cookie.includes("123")} id='nav-orders'>
							ORDERS
						</a>
						<a href={`/signout`} className='navbar_container-item' hidden={!document.cookie.includes("123")} id='nav-signout'>
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
