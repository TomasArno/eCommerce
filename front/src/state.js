import qs from "qs"

import axios from "axios";
axios.defaults.withCredentials = true;

import { apiUrl } from "./utils/constants";

const state = {
  data: {
    isLoggedIn: false,
    isRegistered: false,
    user: {},
    cartItems: [],
    productSelected: {},
  },

  async fetchData({ method = "get", data, params = {}, url = "" }) {
    const response = await axios(`${apiUrl}/${url}`, {
      method,
      data,
      params: qs.stringify(params),
    });

    return response.data;
  },

  getState() {
    return state.data;
  },

  setState(newState) {
    state.data = { ...state.getState(), ...newState };
  },

  setLoggedIn() {
    state.setState({ isLoggedIn: true });
  },

  setIsRegistered() {
    state.setState({ isRegistered: true });
  },

  setEmail(email) {
    state.setState({ email });
  },

  addProductInCart(product) {
    state.data.cartItems.push(product);
  },

  modifyQuantity(productid, newQuantity) {
    const searchedProduct = state.data.cartItems.find((product) => product.id == productid)

    if (searchedProduct) {
      searchedProduct.quantity = newQuantity
    }
  },

  removeProductFromCart(productId) {
    const removedProduct = state.data.cartItems.filter((el) => el.id != productId)
    state.data.cartItems = removedProduct
  }
};

export default state;
