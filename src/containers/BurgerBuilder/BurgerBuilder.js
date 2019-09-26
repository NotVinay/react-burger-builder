import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  constructor() {
    super();
    this.state = {
      ingredients: {
        meat: 2,
        cheese: 1,
        salad: 2,
        bacon: 1
      }
    };
  }
  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div>Burger Builder</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
