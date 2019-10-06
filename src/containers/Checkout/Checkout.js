import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
//import axios from "../../axios-orders";
import axios from "axios";
import { Route } from "react-router-dom";
import Contactdata from "./Contactdata/Contactdata";
import { connect } from "react-redux";

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   price: null
  // };

  // componentDidMount() {
  //   if (this.props.location.state) {
  //     this.setState({
  //       ingredients: this.props.location.state.ingredients,
  //       price: this.props.location.state.price
  //     });
  //   }
  // }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.push(this.props.match.url + "/contact-data");
  };

  render() {
    return (
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
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  };
};
export default connect(mapStateToProps)(Checkout);
