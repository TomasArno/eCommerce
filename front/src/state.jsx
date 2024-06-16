import { createContext, useState } from 'react';
import qs from "qs"

import axios from "axios";
axios.defaults.withCredentials = true;

import { apiUrl } from "./utils/constants";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
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

  // const setState = (newState) => {
  //   state.data = { ...state.getState(), ...newState };
  // }

  const getState = () => {
    return state
  }

  const setLoggedIn = () => {
    state.setState({ isLoggedIn: true });
  }

  const setIsRegistered = () => {
    state.setState({ isRegistered: true });
  }

  const addProductInCart = (productId, quantity) => {
    const { id } = state.getState().user

    const product = { userId: id, productId, quantity }

    state.data.cartItems.push(product);
    state.fetchData({ method: "POST", url: "/orders", data: product })
  }

  const modifyQuantity = (productId, newQuantity) => {
    const searchedProduct = state.data.cartItems.find((product) => product.id == productId)

    if (searchedProduct) {
      searchedProduct.quantity = newQuantity
    }
  }

  const removeProductFromCart = (productId) => {
    const removedProduct = state.data.cartItems.filter((el) => el.id != productId)
    state.data.cartItems = removedProduct
  }


  return (
    <GlobalContext.Provider value={{ getState, fetchData, setLoggedIn, setIsRegistered, addProductInCart, removeProductFromCart, modifyQuantity }}>
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
