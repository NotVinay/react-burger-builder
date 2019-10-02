import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
const Index = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
