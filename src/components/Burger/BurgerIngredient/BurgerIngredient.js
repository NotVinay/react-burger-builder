import React from "react";
import styles from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

const burgerIngredient = props => {
  return props.type !== "breadTop" ? (
    <div
      className={
        styles[props.type.charAt(0).toUpperCase() + props.type.substring(1)]
      }
    />
  ) : (
    <div
      className={
        styles[props.type.charAt(0).toUpperCase() + props.type.substring(1)]
      }
    >
      <div className={styles.Seeds1} />
      <div className={styles.Seeds2} />
    </div>
  );
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default burgerIngredient;
