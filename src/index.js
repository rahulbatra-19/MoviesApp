import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import thunk from "redux-thunk";
import App from "./componets/App";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers";

//  function logger(obj , next ,action)  Curried form of this function
// const logger = function ({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       // middleware code
//       console.log("ACTION_TYPE = ", action.type);
//       next(action);
//     };
//   };
// };

// Another way of writing a logger function
const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type !== "function") {
      console.log("ACTION_TYPE =", action.type);
    }
    next(action);
  };

// const thunk =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     if (typeof action === "function") {
//       console.log("function");
//       return action(dispatch, getState);
//     }
//     return next(action);
//   };

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
console.log("store", store);
// console.log("Before  State", store.getState());

// store.dispatch({
//   type: "ADD_MOVIES",
//   movies: [{ name: "Superman" }],
// });

// console.log("after  State", store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);
