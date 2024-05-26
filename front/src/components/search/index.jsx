import { useState, useEffect } from 'react';
import axios from 'axios';

import './index.css';

function SearchPanel() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios(`http://localhost:8080/api/products?title=${location.pathname.split("/")[2]}`)
			.then((res) => {
				const { statusCode } = res.data
				// resolver que siempre me lleve a la pag y si no existe me muestre que no hay ningunproducto con esas caracteristias

				if (statusCode == 200) {
					const products = res.data.response.docs
					setProducts(products)
				}
			})
			.catch((err) => alert(err));
	}, []);

	return (
		<>
			<h1 className='main_title'>RESULTADOS DE BÚSQUEDA</h1>
			<div className='cards_container'>
				{products.map((card) => (
					<div key={card._id} className='card'>
						<img
							src={card.photo}
							className='card_img'
							alt='product image'
						/>
						<div className='card_data'>
							<h5 className='card_data-title'>{card.title}</h5>
							<p className='card_data-price'>${card.price}</p>
						</div>
						<button type='button' className='btn'>
							ADD TO CART!
						</button>
					</div>
				))}
			</div>
		</>
	);
}

export default SearchPanel;
