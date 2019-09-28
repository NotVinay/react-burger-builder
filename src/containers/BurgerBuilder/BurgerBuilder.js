import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  Salad: 0.5,
  Cheese: 0.4,
  Meat: 1.3,
  Bacon: 0.7
};

class BurgerBuilder extends Component {
  constructor() {
    super();
    this.state = {
      ingredients: {
        Bacon: 0,
        Salad: 0,
        Cheese: 0,
        Meat: 0
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false
    };
  }

  purchaseHandler = bool => {
    console.log("clicked");
    this.setState({ purchasing: bool });
  };

  continuePurchase = () => {
    console.log("Purchase Continued");
  };

  updatePurchaseState = newIngredients => {
    const ingredients = { ...newIngredients };
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    const purchasable = sum > 0 ? true : false;
    this.setState({ purchasable: purchasable });
  };

  decreaseIngredients = ingredientName => {
    if (this.state.ingredients[ingredientName] > 0) {
      let newIngredients = { ...this.state.ingredients };
      newIngredients[ingredientName] -= 1;

      const priceDeduction = INGREDIENT_PRICES[ingredientName];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({ ingredients: newIngredients, totalPrice: newPrice });
      this.updatePurchaseState(newIngredients);
    }
  };

  increaseIngredients = ingredientName => {
    if (this.state.ingredients[ingredientName] < 4) {
      let newIngredients = { ...this.state.ingredients };
      newIngredients[ingredientName] += 1;

      const priceAddition = INGREDIENT_PRICES[ingredientName];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({ ingredients: newIngredients, totalPrice: newPrice });
      this.updatePurchaseState(newIngredients);
    }
  };

  render() {
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          purchaseHandler={this.purchaseHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseHandler={this.purchaseHandler}
            continuePurchase={this.continuePurchase}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredients={this.state.ingredients}
          increaseClick={this.increaseIngredients}
          decreaseClick={this.decreaseIngredients}
          totalPrice={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchaseHandler={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
