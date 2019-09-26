import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "./BuildControls/BuildControls";

class BurgerBuilder extends Component {
  constructor() {
    super();
    this.state = {
      ingredients: {
        Meat: 2,
        Cheese: 1,
        Salad: 2,
        Bacon: 1
      }
    };
  }

  decreaseIngredients = ingredientName => {
    if (this.state.ingredients[ingredientName] > 0) {
      let newIngredients = { ...this.state.ingredients };
      newIngredients[ingredientName] -= 1;
      this.setState({ ingredients: newIngredients });
    }
  };

  increaseIngredients = ingredientName => {
    if (this.state.ingredients[ingredientName] < 4) {
      let newIngredients = { ...this.state.ingredients };
      newIngredients[ingredientName] += 1;
      this.setState({ ingredients: newIngredients });
    }
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredients={this.state.ingredients}
          increaseClick={this.increaseIngredients}
          decreaseClick={this.decreaseIngredients}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
