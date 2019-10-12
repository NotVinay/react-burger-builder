import React, { useState } from "react";
import { updateObject, checkValidity } from "../../../shared/Utility";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import styles from "./Contactdata.module.css";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHander/withErrorHandler";
import Axios from "axios";
import * as actionCreators from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";

const Contactdata = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      label: "Name",
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      label: "Street",
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      label: "Zip Code",
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code"
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true
      },
      valid: false,
      touched: false
    },
    country: {
      label: "Country",
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      label: "Email",
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      label: "Delivery Method",
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      },
      value: "fastest",
      validation: {},
      valid: true
    }
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData
    };
    props.onOrderBurger(order);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };
  let form = (
    <form onSubmit={orderHandler}>
      {Object.keys(orderForm).map(igKey => {
        const obj = orderForm[igKey];
        return (
          // <div key={igKey} />
          <Input
            key={igKey}
            elementType={obj.elementType}
            name={igKey}
            value={obj.value}
            elementConfig={obj.elementConfig}
            invalid={!obj.valid}
            shouldValidate={obj.validation}
            touched={obj.touched}
            changed={event => inputChangedHandler(event, igKey)}
          />
        );
      })}
      <div style={{ margin: "auto" }}>
        <Button type="Success">Submit</Button>
      </div>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return <div className={styles.Contactdata}>{form}</div>;
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: orderData =>
      dispatch(actionCreators.purchaseBurger(orderData))
    // onPurchaseBurgerStart: () => dispatch(actionCreators.purchaseBurgerStart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Contactdata, Axios));
