import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

<<<<<<< HEAD
import { GlobalContext } from "./state";
=======
import Navbar from './components/navbar';
import Input from '@mui/joy/Input';

>>>>>>> dev

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import SearchForm from "./components/search-form";
import "./App.css";

function App() {
  const navigate = useNavigate();

<<<<<<< HEAD
  const { fetchData, setState, state } = useContext(GlobalContext);
=======
	function HandleSearch(e) {
		e.preventDefault()
		const searchBoxData = document.querySelector("#search-input")
		navigate(`/search/${searchBoxData.value}`);
	}
>>>>>>> dev

  useEffect(() => {
    const checkAuth = async () => {
      const data = await fetchData({ url: "sessions" })

      if (data.statusCode != 200) {
        navigate("/login")
      } else {
        setState({ user: data.response, isLoggedIn: true })
      }
    }

<<<<<<< HEAD
    checkAuth()
  }, [])
=======
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
>>>>>>> dev

  console.log(state);

  return (
    <>
      <header className="header">
        <SearchForm />
      </header>

      <main className="main">
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
