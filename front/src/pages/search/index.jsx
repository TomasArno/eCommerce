import { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../../components/card';

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
			<div className='search_container'>
				{products.map((prod) => <Card key={prod._id} title={prod.title} stock={prod.stock} photo={prod.photo} price={prod.price} />)}
			</div>
		</>
	);
}

export default SearchPanel;
