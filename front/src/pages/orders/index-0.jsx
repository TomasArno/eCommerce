import { useState, useEffect } from 'react';
import axios from 'axios';

import "./index.css"

function Orders() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		axios('http://localhost:8080/api/orders')
			.then((res) => {
				if (res.data.response)
					setOrders(res.data.response.docs);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<div className='cards_container'>
				<div className='table-container'>
					<table>
						<thead>
							<tr>
								<th>Photo</th>
								<th>Product</th>
								<th>Price</th>
								<th>Quantity</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((el) => {
								<tr>
									<td><img src={el.productId.title} alt='Product Photo' /></td>
									<td>{el.productId.title}</td>
									<td>${el.productId.price}</td>
									<td>{el.quantity}</td>
								</tr>
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default Orders;