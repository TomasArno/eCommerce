import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import axios from 'axios';

import './App.css';


function CheckAuth() {
	axios.defaults.withCredentials = true;

	const [role, setRole] = useState(false);

	useEffect(() => {
		axios('http://localhost:8080/api/sessions')
			.then((res) => {
				const { statusCode, message } = res.data

				if (statusCode == 200) {
					setRole(message.role)
				}
			})
			.catch((err) => alert(err));
	}, []);

	return role;
}

function HideNavEls(role) {
	let elementsToHide
	switch (role) {
		case 1:
			elementsToHide = [true, true, true, false, false]
			break;
		case 2 || 3:
			elementsToHide = [true, true, false, false, false]
			break;

		default:
			elementsToHide = [false, false, true, true, true]
			break;
	}

	return elementsToHide
}

function App() {
	const navigate = useNavigate();

	function HandleSearch() {
		const searchBoxData = (document.querySelector(".search-box")).value
		navigate(`/search/${searchBoxData}`);
	}

	const role = CheckAuth();

	const [register, login, form, orders, signout] = HideNavEls(role)

	return (
		<>
			<header className='header'>
				<div className='search-box_container'>
					<form className='search-form'>
						<input placeholder='Buscar' className="search-box" type="text" />
						<button onClick={(HandleSearch)} className='search-btn'>search</button>
					</form>
				</div>
				<nav className='navbar'>
					<a href={`/`} className='navbar-item'>
						HOME
					</a>
					<a
						href={`/register`}
						className='navbar-item'
						hidden={register}
						id='nav-register'
					>
						REGISTER
					</a>
					<a
						href={`/login`}
						className='navbar-item'
						hidden={login}
						id='nav-login'
					>
						LOGIN
					</a>
					<a
						href={`/form`}
						className='navbar-item'
						hidden={form}
						id='nav-form'
					>
						FORM
					</a>
					<a
						href={`/orders`}
						className='navbar-item'
						hidden={orders}
						id='nav-orders'
					>
						ORDERS
					</a>
					<a
						onClick={() => axios('http://localhost:8080/api/sessions/signout', { method: "post" },
							{ withCredentials: true })}
						href={`/`}
						className='navbar-item'
						hidden={signout}
						id='nav-signout'
					>
						SIGNOUT
					</a>
				</nav>
			</header>

			<main className='main'>
				<Outlet />
			</main>

			<footer className='footer'>
				<p className='logo'>PROTEO</p>
			</footer>
		</>
	);

}

export default App;
