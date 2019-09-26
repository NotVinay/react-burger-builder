import React from "react";
import styles from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

const burgerIngredient = props => {
  return (
    <div
      className={
        styles[props.type.charAt(0).toUpperCase() + props.type.substring(1)]
      }
    />
  );
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default burgerIngredient;
