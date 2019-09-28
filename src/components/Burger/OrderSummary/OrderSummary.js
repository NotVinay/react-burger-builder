import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class orderSummary extends Component {
  componentDidUpdate() {
    console.log("OrderSummary Updates");
  }

  render() {
    const ingredients = Object.keys(this.props.ingredients).map(igkey => {
      return (
        <li key={igkey + "_order"}>
          <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
          {this.props.ingredients[igkey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredients}</ul>
        <p>
          <strong>Total Price £ {this.props.totalPrice.toFixed(2)}</strong>{" "}
          <br />
          Continue to Purchase
        </p>
        <Button type="Danger" clicked={() => this.props.purchaseHandler(false)}>
          Cancel
        </Button>
        <Button type="Success" clicked={this.props.continuePurchase}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default orderSummary;
