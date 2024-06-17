import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { GlobalProvider } from "./state";
import router from "./router/.";

<<<<<<< HEAD
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode >
=======
const state = {
	data: {
		email: "",
		isLoggedIn: false,
		isRegistered: false,
		user: {},
		cartItems: [],
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
	}
}

export const GlobalContext = createContext(state);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<GlobalContext.Provider value={{ ...state }}>
			<RouterProvider router={router} />
		</GlobalContext.Provider>
	</React.StrictMode>
>>>>>>> dev
);
