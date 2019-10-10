import React from "react";
import styles from "./Order.module.css";

const Order = props => {
  return (
    <div className={styles.Order}>
      Ingredients:{" "}
      {Object.keys(props.ingredients).map(igKey => {
        return (
          <span key={igKey}>
            {igKey}({props.ingredients[igKey]}){" "}
          </span>
        );
      })}
      <p>Price: {props.price}</p>
    </div>
  );
};

export default Order;
