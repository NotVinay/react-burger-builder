import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reducer from "./store/reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(reducer);

const Index = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  rootElement
);
