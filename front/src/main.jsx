import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";

import router from "./router/."

const state = {
	data: {
		email: "",
		isLoggedIn: false,
		isRegistered: false,
		user: {},
		cartItems: [],
		productSelected: {}
	},

	getState() {
		return state.data
	},

	setState(newState) {
		state.data = { ...state.getState(), ...newState }
	},

	setLoggedIn() {
		state.setState({ isLoggedIn: true })
	},

	setIsRegistered() {
		state.setState({ isRegistered: true })
	},

	setEmail(email) {
		state.setState({ email })
	},

	addProductInCart(product) {
		state.data.cartItems.push(product)
	}

	// removeProductFromCart(productId) {
	// 	state.data.cartItems.push(product)
	// }
}

export const GlobalContext = createContext(state);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<GlobalContext.Provider value={{ ...state }}>
			<RouterProvider router={router} />
		</GlobalContext.Provider>
	</React.StrictMode>
);
