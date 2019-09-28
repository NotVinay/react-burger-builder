import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHander/withErrorHandler";

//import axios from "../../axios-orders";
import axios from "axios";

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
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false
    };
  }
  componentDidMount() {
    axios
      .get("https://www.mocky.io/v2/5d8f7bf93200005600adec70")
      .then(response => {
        console.log("Res", response.data);
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ ingredients: null });
      });
  }
  purchaseHandler = bool => {
    console.log("clicked");
    this.setState({ purchasing: bool });
  };

  continuePurchase = () => {
    //console.log("Purchase Continued");
    this.setState({ loading: true });
    // const data = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.price,
    //   customer: {
    //     name: "Jon Snow",
    //     address: {
    //       street: "Road to Wall",
    //       zipcode: "31231",
    //       country: "Winterfell"
    //     },
    //     email: "xyz@email.com"
    //   },
    //   deliveryMode: "fastest"
    // };
    axios
      .get("https://www.asdasmocky.io/v2/5d8f7bf93200005600adec70")
      .then(response => {
        console.log("Res", response);
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false, purchasing: false });
      });
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
    let orderSummary = null;
    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />;
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

      let orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseHandler={this.purchaseHandler}
          continuePurchase={this.continuePurchase}
          totalPrice={this.state.totalPrice}
        />
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} clicked={this.purchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
