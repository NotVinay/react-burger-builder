import React, { Component } from "react";
import Order from "./Order/Order";

class Orders extends Component {
  state = { orders: null };

  componentDidMount() {
    const orders = {
      order1: {
        ingredients: { Cheese: 0, Salad: 1, Meat: 0, Bacon: 1 },
        price: 4.5,
        customer: {
          name: "Jon Snow",
          address: {
            street: "Road to Wall",
            zipcode: "31231",
            country: "Winterfell"
          },
          email: "xyz@email.com"
        },
        deliveryMode: "fastest"
      },
      order2: {
        ingredients: { Cheese: 1, Salad: 1, Meat: 0, Bacon: 1 },
        price: 5.3,
        customer: {
          name: "Jon Snow",
          address: {
            street: "Road to Wall",
            zipcode: "31231",
            country: "Winterfell"
          },
          email: "xyz@email.com"
        },
        deliveryMode: "fastest"
      }
    };
    this.setState({ orders: orders });
  }

  render() {
    let orders = null;
    if (this.state.orders) {
      orders = Object.keys(this.state.orders).map(igKey => {
        return (
          <Order
            key={igKey}
            price={this.state.orders[igKey].price}
            ingredients={this.state.orders[igKey].ingredients}
          />
        );
      });
    }
    return <div>{orders}</div>;
  }
}

export default Orders;
