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
import * as actionCreators from "../../store/actions/index";
//import axios from "../../axios-orders";

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
    this.props.onInitIngredients();
  }
  purchaseHandler = bool => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: bool });
    } else {
      this.props.history.push("/auth");
    }
  };

  continuePurchase = () => {
    //console.log("Purchase Continued");
    this.props.onPurchaseBurgerInit();
    this.props.history.push("/checkout");
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
    let burger = this.props.error ? (
      <p>Ingredients Cant be loaded</p>
    ) : (
      <Spinner />
    );
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
            isAuthenticated={this.isAuthenticated}
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
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncreaseIngredients: ingredientName =>
      dispatch(actionCreators.addIngredient(ingredientName)),
    onDecreaseIngredients: ingredientName =>
      dispatch(actionCreators.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onPurchaseBurgerInit: () => dispatch(actionCreators.purchaseBurgerInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
