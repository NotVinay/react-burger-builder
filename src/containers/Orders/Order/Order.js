import React from "react";
import styles from "./Order.module.css";

const Order = props => {
  return (
    <div className={styles.Order}>
      Ingredients:
      <p>Price: {props.price}</p>
    </div>
  );
};

export default Order;
