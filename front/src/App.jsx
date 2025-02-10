import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import GlobalStore from "./state";

import { Box, Button, ModalClose, Drawer, Divider } from "@mui/joy";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import SearchForm from "./components/search-form";
import DropDownMenu from "./components/drop-menu";
import ServicesList from "./components/service-list";
import Footer from "./components/footer";

import "./App.css";

function App() {
  const { fetchData, setState } = GlobalStore();
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
          <DropDownMenu />
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
                  <ServicesList />
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
