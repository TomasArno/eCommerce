import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';

function Navbar() {
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
                <ListItem role="none">
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
                    >
                        <Person />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}

export default Navbar