import { useContext, useEffect, useState } from "react";
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
  Button,
  ModalClose,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/joy";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import SearchForm from "./components/search-form";
import "./App.css";

const listItems = [
  <Divider key={1}>Combos</Divider>,
  "Disponibles",
  "Arma tu combo",
  <Divider key={2}>Computadoras</Divider>,
  "Servidores",
  "Escritorio",
  "Laptops",
  <Divider key={3}>Periféricos</Divider>,
  "Monitores",
  "Parlantes",
  "Teclados",
  "Mouses",
  "Webcams",
  <Divider key={4}>Componentes</Divider>,
  "Microprocesadores",
  "Tarjetas gráficas",
  "Memoria RAM",
  "Unidades SSD",
  "Fuentes de alimentación",
  "Motherboards",
  <Divider key={5}>Almacenamiento Externo</Divider>,
  "Pendrives",
  "Tarjetas SD",
  "Discos portátiles",
  <Divider key={6}>Redes</Divider>,
  "Cables de alimentación",
  "Cables de audio",
  "Conectores de red",
  "Switches",
  "Routers",
  "Modems",
  <Divider key={7}>Video</Divider>,
  "Cámaras de seguridad",
  <Divider key={8}>Servicios</Divider>,
  "Limpieza de Hardware",
  "Limpieza de Software",
  "Formateo",
];

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
                  <List>
                    {listItems.map((item, i) =>
                      typeof item != "string" ? (
                        item
                      ) : (
                        <ListItem key={i}>
                          <ListItemButton>{item}</ListItemButton>
                        </ListItem>
                      )
                    )}
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Box>
        </Box>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <Box borderTop="2px solid #ddd" component="footer">
        <Typography level="body-xs" fontWeight="bold" textAlign="center">
          © Core Technologies 2025
        </Typography>
      </Box>
    </>
  );
}

export default App;
