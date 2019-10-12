import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
//import axios from "../../axios-orders";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
import Contactdata from "./Contactdata/Contactdata";
import { connect } from "react-redux";

const Checkout = props => {
  const checkoutCanceledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.push(props.match.url + "/contact-data");
  };

  let summary = <Redirect to="/" />;
  if (props.purchasing) {
    summary = (
      <div>
        <CheckoutSummary
          ingredients={props.ingredients}
          checkoutCancelled={checkoutCanceledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={props.match.url + "/contact-data"}
          render={() => (
            <Contactdata ingredients={props.ingredients} price={props.price} />
          )}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchasing: state.order.purchasing
  };
};
export default connect(mapStateToProps)(Checkout);
