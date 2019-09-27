import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import styles from "./BuildControls.module.css";

const buildControls = props => {
  const transformedControls = Object.keys(props.ingredients).map(name => {
    return (
      <BuildControl
        key={"control_" + name}
        controlName={name}
        value={props.ingredients[name]}
        increaseClick={props.increaseClick}
        decreaseClick={props.decreaseClick}
      />
    );
  });
  return (
    <div className={styles.BuildControls}>
      <p>
        Total Price : <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {transformedControls}
      <button
        className={styles.OrderButton}
        disabled={!props.purchasable}
        onClick={() => props.purchaseHandler(true)}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
