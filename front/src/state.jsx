import { create } from "zustand";
import axios from "axios";
import qs from "qs";
import { apiUrl } from "./utils/constants";

axios.defaults.withCredentials = true;

// Create the Zustand store
const useGlobalStore = create((set) => ({
  // Initial state
  isLoggedIn: false,
  isRegistered: false,
  user: {},
  cartItems: [],
  productSelected: {},

  // Methods to fetch data
  fetchData: async ({ method = "GET", data, query = {}, url = "" }) => {
    const response = await axios(`${apiUrl}/${url}`, {
      method,
      data,
      params: qs.stringify(query),
    });

    return response.data;
  },

  // Set new state
  setState: (newState) => set((state) => ({ ...state, ...newState })),

  // Fetch cart items
  getCart: async () => {
    const data = await useGlobalStore.getState().fetchData({ url: "orders" });

    return data?.statusCode === 200 ? data.response.docs : false;
  },

  // Add product to cart
  addProductInCart: async (productId, quantity) => {
    const product = { productId, quantity };

    const res = await useGlobalStore
      .getState()
      .fetchData({ method: "POST", url: "orders", data: product });

    if (res.statusCode === 201) {
      const cart = await useGlobalStore.getState().getCart();

      useGlobalStore.getState().setState({ cartItems: cart });
    }
  },

  // Modify product quantity in cart
  modifyQuantity: async (orderId, newQuantity) => {
    const res = await useGlobalStore.getState().fetchData({
      method: "PUT",
      url: `orders/${orderId}`,
      data: { quantity: newQuantity },
    });

    if (res.statusCode === 200) {
      const cart = await useGlobalStore.getState().getCart();

      useGlobalStore.getState().setState({ cartItems: cart });
    }
  },

  // Remove product from cart
  removeProductFromCart: async (orderId) => {
    const res = await useGlobalStore
      .getState()
      .fetchData({ method: "DELETE", url: `orders/${orderId}` });

    if (res.statusCode === 200) {
      const cart = await useGlobalStore.getState().getCart();
      const data = cart ? cart : [];

      useGlobalStore.getState().setState({ cartItems: data });
    }
  },

  // Getter for user data
  getUserData: () => useGlobalStore.getState().user,
}));

export default useGlobalStore;
