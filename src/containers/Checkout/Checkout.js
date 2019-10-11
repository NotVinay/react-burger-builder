import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
//import axios from "../../axios-orders";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
import Contactdata from "./Contactdata/Contactdata";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.push(this.props.match.url + "/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.purchasing) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCanceledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            render={() => (
              <Contactdata
                ingredients={this.props.ingredients}
                price={this.props.price}
              />
            )}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchasing: state.order.purchasing
  };
};
export default connect(mapStateToProps)(Checkout);
