import React, { Component, useState } from "react";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
import * as utilities from "../../shared/Utility";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import styles from "./Auth.module.css";

const auth = props => {
  const [controls, setControls] = useState({
    email: {
      label: "Email",
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },

    password: {
      label: "Password",
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Password"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = utilities.updateObject(
      controls[inputIdentifier],
      {
        value: event.target.value,
        valid: utilities.checkValidity(
          event.target.value,
          controls[inputIdentifier].validation
        ),
        touched: true
      }
    );
    const updatedForm = utilities.updateObject(controls, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    setControls(updatedForm);
    setFormIsValid(formIsValid);
  };

  const authenticate = event => {
    event.preventDefault();
    props.onAuthInit(controls.email.value, controls.password.value, isSignUp);
  };

  const switchAuthModeHandler = event => {
    event.preventDefault();
    setIsSignUp(!isSignUp);
  };
  let redirect = null;
  if (props.isAuthenticated) {
    if (props.isBuilding) {
      redirect = <Redirect to="/checkout" />;
    } else {
      redirect = <Redirect to="/" />;
    }
  }
  let form = <Spinner />;
  if (!props.loading) {
    form = (
      <form onSubmit={authenticate} className={styles.Auth}>
        {Object.keys(controls).map(igKey => {
          const obj = controls[igKey];
          return (
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
        <Button type="Success">{isSignUp ? "SIGN UP" : "SIGN IN"}</Button>
        <Button clicked={switchAuthModeHandler} type="Danger">
          Switch to {isSignUp ? "SIGN IN" : "SIGN UP"}
        </Button>
      </form>
    );
  }
  return (
    <div>
      {redirect}
      {form} {props.error ? <p>{props.error}</p> : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null,
    isBuilding: state.burgerBuilder.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthInit: (email, password, isSignUp) =>
      dispatch(actionCreators.authInit(email, password, isSignUp))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(auth);
