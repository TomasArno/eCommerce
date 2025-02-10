import { create } from "zustand";

const offersStore = create((set) => ({
  productsOffers: [],

  setOffers: (productsOffers) => set({ productsOffers }),
}));

const bestSellersStore = create((set) => ({
  productsBestSellers: [],

  setBestSellers: (productsBestSellers) => set({ productsBestSellers }),
}));

const featuredsStore = create((set) => ({
  productsFeatureds: [],

  setFeatureds: (productsFeatureds) => set({ productsFeatureds }),
}));

export { offersStore, featuredsStore, bestSellersStore };
