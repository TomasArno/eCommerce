// import { useState, useEffect } from 'react';
// import axios from 'axios';
import { useContext } from 'react';

import { GlobalContext } from "../../main"
import Order from "../../components/order"

function Cart() {
	const { getState } = useContext(GlobalContext)
	const { cartItems } = getState()

	// const [orders, setOrders] = useState([]);


	// useEffect(() => {
	// 	axios('http://localhost:8080/api/orders')
	// 		.then((res) => {
	// 			if (res.data.response)
	// 				setOrders(res.data.response.docs);
	// 		})
	// 		.catch((err) => console.log(err));
	// }, []);

	return (
		<div className="orders_container">
			{
				cartItems.map((order, i) =>
					<Order key={i} title={order.title} units={order.quantity} date={""} state={order.state} photo={order.photo} />
				)}
		</div>
	);
}

export default Cart;