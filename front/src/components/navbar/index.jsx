import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';

import { GlobalContext } from "../../state";

import { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

function Navbar() {
    const { getState } = useContext(GlobalContext)
    // const navigate = useNavigate()

    const { isLoggedIn } = getState()

    const handleProfile = () => {

        console.log(isLoggedIn);
        //     navigate("/profile") 
        //     // if (isLoggedIn) {
        //     //     navigate("/profile")
        //     // } else {
        //     //     navigate("/login")
        //     // }
    }

    return (
        <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
            <List sx={{ height: 50 }} role="menubar" orientation="horizontal">
                <ListItem role="none">
                    <ListItemButton
                        role="menuitem"
                        component="a"
                        href="/"
                        aria-label="Home"
                    >
                        <Home />
                    </ListItemButton>
                </ListItem>
                <ListDivider />
                <ListItem sx={{ hidden: !isLoggedIn }} role="none">
                    <ListItemButton role="menuitem" component="a" href="orders">
                        Ordenes
                    </ListItemButton>
                </ListItem>
                <ListItem role="none" sx={{ marginInlineStart: 'auto' }}>
                    <ListItemButton
                        role="menuitem"
                        component="a"
                        href="login"
                        aria-label="Profile"
                        onClick={handleProfile}
                    >
                        <Person />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}

export default Navbar