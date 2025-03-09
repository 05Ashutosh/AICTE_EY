// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
// import { Provider } from "react-redux";
import { store } from "./app/store.js";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// createRoot(document.getElementById("root")).render(
//   // <StrictMode>
//   <Provider store={store}>
//     <App />
//   </Provider>
//   // </StrictMode>,
// );

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import store from './store';
// import App from './App';
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
