import { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../../components/card';

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
		<div className='cards_container'>
			{products.map((prod) => <Card key={prod._id} title={prod.title} stock={prod.stock} photo={prod.photo} price={prod.price} />)}
			{/* HACER CARROUSEL */}
		</div>
	);
}

export default Index;
