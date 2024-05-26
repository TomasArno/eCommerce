// import { useState, useEffect } from 'react';
// import axios from 'axios';

// import "./index.css"

// function Orders() {
// 	const [orders, setOrders] = useState([]);

// 	useEffect(() => {
// 		axios('http://localhost:8080/api/orders')
// 			.then((res) => {
// 				if (res.data.response)
// 					setOrders(res.data.response.docs);
// 			})
// 			.catch((err) => console.log(err));
// 	}, []);

// 	return (
// 		<>
// 			<div className='cards_container'>
// 				<div className='table-container'>
// 					<table>
// 						<thead>
// 							<tr>
// 								<th>Photo</th>
// 								<th>Product</th>
// 								<th>Price</th>
// 								<th>Quantity</th>
// 							</tr>
// 						</thead>
// 						<tbody>
// 							{orders.map((el) => {
// 								<tr>
// 									<td><img src={el.productId.title} alt='Product Photo' /></td>
// 									<td>{el.productId.title}</td>
// 									<td>${el.productId.price}</td>
// 									<td>{el.quantity}</td>
// 								</tr>
// 							})}
// 						</tbody>
// 					</table>
// 				</div>
// 			</div>
// 		</>
// 	);
// }

// export default Orders;

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';

import OrderTable from './comps/orderTable';
import OrderList from './comps/orderList';


function Orders() {
	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />
			<Box sx={{ display: 'flex', minHeight: '100dvh' }}>
				<Box
					component="main"
					className="MainContent"
					sx={{
						px: { xs: 2, md: 6 },
						pt: {
							xs: 'calc(12px + var(--Header-height))',
							sm: 'calc(12px + var(--Header-height))',
							md: 3,
						},
						pb: { xs: 2, sm: 2, md: 3 },
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						minWidth: 0,
						height: '100dvh',
						gap: 1,
					}}
				>
					<OrderTable />
					<OrderList />
				</Box>
			</Box>
		</CssVarsProvider>
	);
}

export default Orders