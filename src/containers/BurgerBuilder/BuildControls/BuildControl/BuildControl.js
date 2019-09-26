import React from "react";
import styles from "./BuildControl.module.css";

const buildControl = props => {
  return (
    <div className={styles.BuildControl}>
      <h3 className={styles.ControlName}>{props.controlName}</h3>
      <button
        onClick={() => props.decreaseClick(props.controlName)}
        className={styles.LessButton}
      >
        Less
      </button>
      {props.value}
      <button
        onClick={() => props.increaseClick(props.controlName)}
        className={styles.MoreButton}
      >
        More
      </button>
    </div>
  );
};

export default buildControl;
