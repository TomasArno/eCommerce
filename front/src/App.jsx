import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { GlobalContext } from "./state";

import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  Dropdown,
  Typography,
  Divider,
} from "@mui/joy";

import SearchForm from "./components/search-form";
import "./App.css";

function App() {
  const { fetchData, setState } = useContext(GlobalContext);

  useEffect(() => {
    const checkAuth = async () => {
      const data = await fetchData({ url: "sessions" });

      if (data.statusCode == 200) {
        setState({ user: data.response, isLoggedIn: true });
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <header className="header">
        <SearchForm />
        <Divider />
        <Box>
          <Dropdown>
            <MenuButton>Actions</MenuButton>
            <Menu>
              <MenuItem>Add item</MenuItem>
            </Menu>
          </Dropdown>
        </Box>
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
