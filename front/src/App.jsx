import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/navbar';
import Input from '@mui/joy/Input';


// function HideNavEls(role) {
// 	let elementsToHide
// 	switch (role) {
// 		case 1:
// 			elementsToHide = [true, true, true, false, false]
// 			break;
// 		case 2 || 3:
// 			elementsToHide = [true, true, false, false, false]
// 			break;

// 		default:
// 			elementsToHide = [false, false, true, true, true]
// 			break;
// 	}

// 	return elementsToHide
// }

function App() {
	const navigate = useNavigate();

	function HandleSearch(e) {
		e.preventDefault()
		const searchBoxData = document.querySelector("#search-input")
		navigate(`/search/${searchBoxData.value}`);
	}

	// const role = CheckAuth();

	// const [register, login, form, orders, signout] = HideNavEls(role)

	return (
		<>
			<header className='header'>
				<div className='search-box_container'>
					<form className='search-form'>
						<Input slotProps={{
							input: {
								id: 'search-input',
							}
						}} className='search-input' sx={{ width: "100%" }} size="sm" placeholder="Type in here…" variant="plain" />
						<button onClick={(HandleSearch)} className='search-btn'>search</button>
					</form>
				</div>
				<Navbar />
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
