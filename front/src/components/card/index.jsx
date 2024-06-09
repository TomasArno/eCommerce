import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

import Button from '../button';

import { useContext } from 'react';
import { GlobalContext } from "../../main"
import { useNavigate } from 'react-router-dom';

function BasicCard({ id, photo, title, price, stock }) {
	const { getState } = useContext(GlobalContext)
	const navigate = useNavigate()

	function handleBtn() {
		const { isLoggedIn } = getState()
		if (isLoggedIn) {
			navigate("/products")
		} else {
			navigate("/login")
		}
	}

	return (
		<Card sx={{ id, width: 250, height: 270 }}>
			<div>
				<Typography level="title-lg">{title}</Typography>
				<Typography level="body-sm">Disponible: {stock}</Typography>
			</div>
			<AspectRatio minHeight="120px" maxHeight="200px">
				<img
					src={photo}
					loading="lazy"
					alt=""
				/>
			</AspectRatio>
			<CardContent orientation="horizontal">
				<div>
					<Typography level="body-sm">Precio</Typography>
					<Typography fontSize="lg" fontWeight="lg">
						${price}
					</Typography>
				</div>
				<Button content="Ver" handler={handleBtn} height="10px" />
			</CardContent>
		</Card >
	);
}

export default BasicCard
