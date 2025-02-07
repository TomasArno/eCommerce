import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { GlobalContext } from "./state";

import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  Dropdown,
  Button,
  ModalClose,
  Drawer,
  Divider,
} from "@mui/joy";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import SearchForm from "./components/search-form";
import ServiceList from "./components/service-list";
import Footer from "./components/footer";

import "./App.css";

function App() {
  const { fetchData, setState } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(inOpen);
  };

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Dropdown>
            <MenuButton>Computadoras</MenuButton>
            <Menu>
              <MenuItem>Escritorio</MenuItem>
              <MenuItem>Notebooks</MenuItem>
            </Menu>
          </Dropdown>
          <Dropdown>
            <MenuButton>Placas de video</MenuButton>
          </Dropdown>
          <Dropdown>
            <MenuButton>Microprocesadores</MenuButton>
          </Dropdown>
          <Dropdown>
            <MenuButton>Memorias</MenuButton>
          </Dropdown>
          <Dropdown>
            <MenuButton>Gabinetes</MenuButton>
          </Dropdown>
          <Dropdown>
            <MenuButton>Arma tu PC</MenuButton>
          </Dropdown>

          <Box
            sx={{
              position: "absolute",
              left: "0",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Button
                color="black"
                variant="plain"
                onClick={toggleDrawer(true)}
              >
                <MenuRoundedIcon />
              </Button>
              <Drawer
                size="sm"
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
              >
                <Box
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <ModalClose
                    sx={{
                      mt: 2,
                    }}
                  />
                  <ServiceList />
                </Box>
              </Drawer>
            </Box>
          </Box>
        </Box>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default App;
