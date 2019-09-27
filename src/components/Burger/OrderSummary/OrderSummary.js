import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredients = Object.keys(props.ingredients).map(igkey => {
    return (
      <li key={igkey + "_order"}>
        <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
        {props.ingredients[igkey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredients}</ul>
      <p>
        <strong>Total Price £ {props.totalPrice.toFixed(2)}</strong> <br />
        Continue to Purchase
      </p>
      <Button type="Danger" clicked={() => props.purchaseHandler(false)}>
        Cancel
      </Button>
      <Button type="Success" clicked={props.continuePurchase}>
        Continue
      </Button>
    </Aux>
  );
};

export default orderSummary;
