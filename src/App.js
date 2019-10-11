import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Switch, Route } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});
const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actionCreators.authCheckState())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
