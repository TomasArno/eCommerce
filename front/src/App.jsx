import { Outlet } from 'react-router-dom';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import SearchForm from './components/search-form';
import './App.css';

function App() {
	return (
		<>
			<header className='header'>
				<SearchForm />
			</header>

			<main className='main'>
				<Outlet />
			</main>

			<Box borderTop="2px solid #ddd" component="footer">
				<Typography level="body-xs" fontWeight="bold" textAlign="center">
					© Proteo Software
				</Typography>
			</Box>
		</>
	);

}

export default App;
