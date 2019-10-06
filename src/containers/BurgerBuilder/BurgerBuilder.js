import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHander/withErrorHandler";
import axios from "axios";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
//import axios from "../../axios-orders";
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
      purchasable: false,
      purchasing: false,
      loading: false
    };
  }
  componentDidMount() {
    // axios
    //   .get("https://www.mocky.io/v2/5d8f7bf93200005600adec70")
    //   .then(response => {
    //     console.log("Res", response.data);
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ ingredients: null });
    //   });
  }
  purchaseHandler = bool => {
    this.setState({ purchasing: bool });
  };

  continuePurchase = () => {
    //console.log("Purchase Continued");
    this.setState({ loading: true });
    this.props.history.push("/checkout", {
      ingredients: { ...this.props.ingredients },
      price: this.props.totalPrice
    });
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
    // axios
    //   .get("https://www.asdasmocky.io/v2/5d8f7bf93200005600adec70")
    //   .then(response => {
    //     console.log("Res", response);
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({ loading: false, purchasing: false });
    //   });
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
    return sum > 0 ? true : false;
  };

  render() {
    let orderSummary = null;
    let burger = <Spinner />;
    console.log(this.props.ingredients);
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />;
          <BuildControls
            ingredients={this.props.ingredients}
            increaseClick={this.props.onIncreaseIngredients}
            decreaseClick={this.props.onDecreaseIngredients}
            totalPrice={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            purchaseHandler={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseHandler={this.purchaseHandler}
          continuePurchase={this.continuePurchase}
          totalPrice={this.props.totalPrice}
        />
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} clicked={this.purchaseHandler}>
          Modal
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncreaseIngredients: ingredientName =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
      }),
    onDecreaseIngredients: ingredientName =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
