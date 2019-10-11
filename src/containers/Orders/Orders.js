import React, { Component } from "react";
import Order from "./Order/Order";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner />;
    if (this.props.orders) {
      orders = Object.keys(this.props.orders).map(igKey => {
        return (
          <Order
            key={igKey}
            price={this.props.orders[igKey].price}
            ingredients={this.props.orders[igKey].ingredients}
          />
        );
      });
    }
    return <div>{orders}</div>;
  }
}
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    token: state.auth.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: token => dispatch(actionCreators.fetchOrdersInit(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
