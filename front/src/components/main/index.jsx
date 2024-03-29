import { useState, useEffect } from 'react';
import axios from 'axios';

import './index.css';

function Index() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios('http://localhost:8080/api/products')
			.then((res) => {
				if (res.data.response)
					setProducts(res.data.response.docs);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<h1 className='main_title'>MY FIRST ECOMMERCE</h1>

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

export default Index;
