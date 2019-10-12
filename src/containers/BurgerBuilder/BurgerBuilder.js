import React, { Component, useState, useEffect } from "react";
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

const BurgerBuilder = props => {
  const [purchasable, setPurchasble] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { onInitIngredients } = props;
  useEffect(() => {
    props.onInitIngredients();
  }, [onInitIngredients]);

  const purchaseHandler = bool => {
    if (props.isAuthenticated) {
      setPurchasing(bool);
    } else {
      props.history.push("/auth");
    }
  };

  const continuePurchase = () => {
    props.onPurchaseBurgerInit();
    props.history.push("/checkout");
  };

  const updatePurchaseState = newIngredients => {
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

  let orderSummary = null;
  let burger = props.error ? <p>Ingredients Cant be loaded</p> : <Spinner />;
  if (props.ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={props.ingredients} />;
        <BuildControls
          ingredients={props.ingredients}
          increaseClick={props.onIncreaseIngredients}
          decreaseClick={props.onDecreaseIngredients}
          totalPrice={props.totalPrice}
          purchasable={updatePurchaseState(props.ingredients)}
          purchaseHandler={purchaseHandler}
          isAuthenticated={props.isAuthenticated}
        />
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        purchaseHandler={purchaseHandler}
        continuePurchase={continuePurchase}
        totalPrice={props.totalPrice}
      />
    );

    if (loading) {
      orderSummary = <Spinner />;
    }
  }
  return (
    <Aux>
      <Modal show={purchasing} clicked={purchaseHandler}>
        Modal
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

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
