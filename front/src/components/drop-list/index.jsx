import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { GlobalContext } from '../../main';

import Person from '@mui/icons-material/Person';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ModalClose from '@mui/joy/ModalClose';


function DropList() {
    const navigate = useNavigate();

    const { getState } = useContext(GlobalContext)
    const { isLoggedIn } = getState()

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(inOpen);
    };

    const checkIsLoggedIn = (e) => {
        if (!isLoggedIn) {
            navigate("/login")
        } else {
            switch (e.target.value) {
                case "orders":
                    navigate("orders")
                    break

                default:
                    navigate("/")
                    break
            }
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Button color='black' variant="plain" onClick={toggleDrawer(true)}>
                <Person />
            </Button>
            <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
                <Box
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <ModalClose />
                    <List>
                        <ListItem >
                            <ListItemButton component="a" href='register'>Creá tu cuenta</ListItemButton>
                        </ListItem>
                        <ListItem >
                            <ListItemButton component="a" href='login'>Ingresá</ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem >
                            <ListItemButton onClick={checkIsLoggedIn} component="a" id='orders'>Mis compras</ListItemButton>
                        </ListItem>
                        <ListItem >
                            <ListItemButton onClick={checkIsLoggedIn} component="a" id='products'>Productos</ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box >
    );
}

export default DropList