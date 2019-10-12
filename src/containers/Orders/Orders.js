import React, { Component, useEffect } from "react";
import Order from "./Order/Order";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = props => {
  const { onFetchOrders } = props;
  useEffect(() => {
    props.onFetchOrders(props.token);
  }, [onFetchOrders]);

  let orders = <Spinner />;
  if (props.orders) {
    orders = Object.keys(props.orders).map(igKey => {
      return (
        <Order
          key={igKey}
          price={props.orders[igKey].price}
          ingredients={props.orders[igKey].ingredients}
        />
      );
    });
  }
  return <div>{orders}</div>;
};

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
