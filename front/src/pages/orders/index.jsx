// import { useState, useEffect } from 'react';
// import axios from 'axios';
import Order from "../../components/order"

import "./index.css"

const orders = [
	{
		date: "2023-05-12",
		productId: 101,
		state: "Shipped",
		quantity: 15,
		img: "https://picsum.photos/200",
		title: "Protección Tensión Estabilizador Eléctrica Trv 6 Tomas Rj45"
	}, {
		date: "2023-06-01",
		productId: 202,
		state: "Pending",
		title: "Protección Tensión Estabilizador Eléctrica Trv 6 Tomas Rj45",
		quantity: 8,
		img: "https://picsum.photos/200",
	},
	{
		date: "2023-04-23",
		productId: 303,
		state: "Delivered",
		title: "Protección Tensión Estabilizador Eléctrica Trv 6 Tomas Rj45",
		quantity: 5,
		img: "https://picsum.photos/200",
	},
];

console.log(orders);

function Orders() {
	// const [orders, setOrders] = useState([]);


	// useEffect(() => {
	// 	axios('http://localhost:8080/api/orders')
	// 		.then((res) => {
	// 			if (res.data.response)
	// 				setOrders(res.data.response.docs);
	// 		})
	// 		.catch((err) => console.log(err));
	// }, []);

	console.log(orders);

	return (
		<div className="orders_container">
			{
				orders.map((order, i) =>
					<div key={i} className="order-container">
						<Order title={order.title} units={order.quantity} date={order.date} state={order.state} photo={order.img} />
						{
							// iterar cada producto y poner una nueva card
						}

					</div>)
			}

		</div>
	);
}

export default Orders;