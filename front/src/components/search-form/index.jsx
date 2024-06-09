// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Link from '@mui/joy/Link';
import Badge from '@mui/joy/Badge';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import ShoppingCartCheckout from '@mui/icons-material/ShoppingCartCheckout';

import DropList from '../drop-list';
import Button from '../button';


import './index.css';


function SearchForm() {
    // const [count, setCount] = useState(0);
    let count = 0
    const navigate = useNavigate();

    const HandleSearch = (e) => {
        e.preventDefault()

        const searchBoxData = document.querySelector("#search-input")
        navigate(`/search/${searchBoxData.value}`);
    }

    return (
        <div className='search-box_container'>
            <Link underline="none" href="/">
                <Typography fontSize="xl">logo</Typography>
            </Link>
            <form className='search-form'>
                <Input slotProps={{
                    input: { id: 'search-input' }
                }} className='search-input' sx={{ width: "100%", background: "#eee" }} size="sm" placeholder="Buscar productos" variant="plain" />
                <Button handler={HandleSearch} content="Buscar" className='search-btn' />
            </form>
            <DropList />
            <Badge badgeContent={count} size='sm'>
                <Typography fontSize="xl">
                    <ShoppingCartCheckout />
                </Typography>
            </Badge>
        </div>)
}

export default SearchForm