import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import state from "./state";
import router from "./router/.";

export const GlobalContext = createContext(state);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContext.Provider value={{ ...state }}>
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  </React.StrictMode>
);
