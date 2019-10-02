import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";

const checkoutSummary = props => {
  let summary = (
    <div>
      You havent build a burger yet, Please : <Link to="/">Click Here </Link> to
      build a burger.
    </div>
  );
  if (props.ingredients) {
    const ingredients = Object.keys(props.ingredients).map(igKey => {
      return (
        <span key={igKey} style={{ display: "inline-block" }}>
          {igKey}({props.ingredients[igKey]})
        </span>
      );
    });

    summary = (
      <div>
        <h2>We hope it tastes Well</h2>
        <Burger ingredients={props.ingredients} />
        <div>
          Your Burger Contains:
          {ingredients}
        </div>
        <Button type="Danger" clicked={props.checkoutCancelled}>
          CANCEL
        </Button>
        <Button type="Success" clicked={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    );
  }

  return <div>{summary}</div>;
};

export default checkoutSummary;
