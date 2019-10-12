import React, { Component, useEffect, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Switch, Route } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";
// asynComponent replaced by react.lazy
// import asyncComponent from "./hoc/asyncComponent/asyncComponent";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});
const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});
const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});

const App = props => {
  const { onCheckAuthState } = props;
  useEffect(() => {
    props.onCheckAuthState();
  }, [onCheckAuthState]);

  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" component={BurgerBuilder} />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </Layout>
  );
};

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
