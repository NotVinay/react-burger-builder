import React from "react";
import styles from "./BuildControl.module.css";

const buildControl = props => {
  return (
    <div className={styles.BuildControl}>
      <p className={styles.Label}>{props.controlName}</p>
      <button
        onClick={() => props.decreaseClick(props.controlName)}
        className={styles.Less}
        disabled={props.value <= 0}
      >
        Less
      </button>
      {props.value}
      <button
        onClick={() => props.increaseClick(props.controlName)}
        className={styles.More}
        disabled={props.value >= 4}
      >
        More
      </button>
    </div>
  );
};

export default buildControl;
