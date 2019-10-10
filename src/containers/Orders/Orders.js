import React, { Component } from "react";
import Order from "./Order/Order";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    // const orders = {
    //   order1: {
    //     ingredients: { Cheese: 0, Salad: 1, Meat: 0, Bacon: 1 },
    //     price: 4.5,
    //     customer: {
    //       name: "Jon Snow",
    //       address: {
    //         street: "Road to Wall",
    //         zipcode: "31231",
    //         country: "Winterfell"
    //       },
    //       email: "xyz@email.com"
    //     },
    //     deliveryMode: "fastest"
    //   },
    //   order2: {
    //     ingredients: { Cheese: 1, Salad: 1, Meat: 0, Bacon: 1 },
    //     price: 5.3,
    //     customer: {
    //       name: "Jon Snow",
    //       address: {
    //         street: "Road to Wall",
    //         zipcode: "31231",
    //         country: "Winterfell"
    //       },
    //       email: "xyz@email.com"
    //     },
    //     deliveryMode: "fastest"
    //   }
    // };
    //console.log(JSON.stringify(orders));
    this.props.onFetchOrders();
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
    orders: state.order.orders
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actionCreators.fetchOrdersInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
