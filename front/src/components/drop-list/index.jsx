import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../../state";

import Person from "@mui/icons-material/Person";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ModalClose from "@mui/joy/ModalClose";

function DropList() {
  const navigate = useNavigate();

  const { getState, fetchData } = useContext(GlobalContext);
  const { isLoggedIn, user } = getState();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(inOpen);
  };

  const checkIsLoggedIn = (e) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      switch (e.target.id) {
        case "orders":
          navigate("orders");
          break;

        case "profile":
          navigate("profile");
          break;

        default:
          navigate("/");
          break;
      }
    }
  };

  const handleSignOut = () => {
    fetchData({ method: "POST", url: "sessions/signout" })
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Button color="black" variant="plain" onClick={toggleDrawer(true)}>
        <Person />
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <ModalClose />
          <List>
            {!isLoggedIn ? (
              <>
                <ListItem>
                  <ListItemButton component="a" href="register">
                    Creá tu cuenta
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component="a" href="login">
                    Ingresá
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <ListItemButton id="profile" component="a" onClick={checkIsLoggedIn}>
                    {user.name?.toUpperCase()}
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component="a" href="login" onClick={handleSignOut}>
                    Salir
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton
                onClick={checkIsLoggedIn}
                component="a"
                id="orders"
              >
                Mis compras
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={checkIsLoggedIn}
                component="a"
                id="products"
              >
                Productos
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default DropList;
