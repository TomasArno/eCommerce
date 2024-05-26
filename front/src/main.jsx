import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";

import router from "./router/."

const state = {
	data: {
		isLoggedIn: false,
		user: {},
		cartItems: []
	},
	getState: () => state.data,
	setState: (newState) =>
		state.data = { ...state.getState(), ...newState }
	,
	handleLogin: () => state.setState({ isLoggedIn: true }),
};

export const GlobalContext = createContext(state);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<GlobalContext.Provider value={{ ...state }}>
			<RouterProvider router={router} />
		</GlobalContext.Provider>
	</React.StrictMode>
);
