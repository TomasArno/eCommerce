import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { GlobalContext } from "./main";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import SearchForm from "./components/search-form";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const { fetchData, setState, getState } = useContext(GlobalContext);

  useEffect(() => {
    const checkAuth = async () => {
      const data = await fetchData({ url: "sessions" })

      if (data.statusCode != 200) {
        navigate("/login")
      } else {
        setState({ user: data.message, isLoggedIn: true })
        console.log(getState());
      }
    }

    checkAuth()
  })

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
