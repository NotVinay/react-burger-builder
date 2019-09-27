import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import styles from "./Burger.module.css";

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(name => {
      return [...Array(props.ingredients[name])].map((_, i) => {
        return <BurgerIngredient key={name + i} type={name} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Add Ingredients</p>;
  }
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="breadTop" />
      {transformedIngredients}
      <BurgerIngredient type="breadBottom" />
    </div>
  );
};

export default Burger;
