import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import styles from "./Burger.module.css";

const Burger = props => {
  const transformedIngredients = Object.keys(props.ingredients).map(name => {
    return [...Array(props.ingredients[name])].map((_, i) => {
      return <BurgerIngredient key={name + i} type={name} />;
    });
  });
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="breadTop" />
      {transformedIngredients}
      <BurgerIngredient type="breadBottom" />
    </div>
  );
};

export default Burger;
