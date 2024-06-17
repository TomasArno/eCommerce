import { createContext, useState } from 'react';
import qs from "qs"

import axios from "axios";
axios.defaults.withCredentials = true;

import { apiUrl } from "./utils/constants";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [state, _setState] = useState({
    isLoggedIn: false,
    isRegistered: false,
    user: {},
    cartItems: [],
    productSelected: {},
  });

  const fetchData = async ({ method = "GET", data, query = {}, url = "" }) => {
    const response = await axios(`${apiUrl}/${url}`, {
      method,
      data,
      params: qs.stringify(query),
    });

    return response.data;
  }

  const setState = (newState) => {
    _setState((prevState) => ({ ...prevState, ...newState }));
  }

  const getCart = async () => {
    const data = await fetchData({ url: "orders" })
    if (data?.statusCode == 200) return data.response.docs
    else false
  }

  const getUserData = () => state.user

  const addProductInCart = async (productId, quantity) => {
    const product = { productId, quantity }

    const res = await fetchData({ method: "POST", url: "orders", data: product })

    if (res.statusCode == 201) {
      const cart = await getCart()
      setState({ cartItems: cart })
    }
  }

  const modifyQuantity = async (orderId, newQuantity) => {
    const res = await fetchData({ method: "PUT", url: `orders/${orderId}`, data: { quantity: newQuantity } })

    if (res.statusCode == 200) {
      const cart = await getCart()
      setState({ cartItems: cart })
    }
  }

  const removeProductFromCart = async (orderId) => {
    const res = await fetchData({ method: "DELETE", url: `orders/${orderId}` })

    if (res.statusCode == 200) {
      const cart = await getCart()
      const data = cart ? cart : []

      setState({ cartItems: data })
    }
  }

  return (
    <GlobalContext.Provider value={{ state, setState, fetchData, getCart, getUserData, addProductInCart, removeProductFromCart, modifyQuantity }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };


// const state = {
//   data: {
//     isLoggedIn: false,
//     isRegistered: false,
//     user: {},
//     cartItems: [],
//     productSelected: {},
//   },

//   async fetchData({ method = "GET", data, query = {}, url = "" }) {
//     const response = await axios(`${apiUrl}/${url}`, {
//       method,
//       data,
//       params: qs.stringify(query),
//     });

//     return response.data;
//   },

//   getState() {
//     return state.data;
//   },

//   setState(newState) {
//     state.data = { ...state.getState(), ...newState };
//   },

//   setLoggedIn() {
//     state.setState({ isLoggedIn: true });
//   },

//   setIsRegistered() {
//     state.setState({ isRegistered: true });
//   },

//   setEmail(email) {
//     state.setState({ email });
//   },

//   addProductInCart(productId, quantity) {
//     const { id } = state.getState().user

//     const product = { userId: id, productId, quantity }

//     state.data.cartItems.push(product);
//     state.fetchData({ method: "POST", url: "/orders", data: product })
//   },

//   modifyQuantity(productId, newQuantity) {
//     const searchedProduct = state.data.cartItems.find((product) => product.id == productId)

//     if (searchedProduct) {
//       searchedProduct.quantity = newQuantity
//     }
//   },

//   removeProductFromCart(productId) {
//     const removedProduct = state.data.cartItems.filter((el) => el.id != productId)
//     state.data.cartItems = removedProduct
//   }
// };

// export default state;
