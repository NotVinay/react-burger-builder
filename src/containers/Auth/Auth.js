import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
import * as utilities from "../../shared/Utility";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import styles from "./Auth.module.css";

class auth extends Component {
  state = {
    controls: {
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
    },
    formIsValid: false,
    isSignUp: true
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = utilities.updateObject(
      this.state.controls[inputIdentifier],
      {
        value: event.target.value,
        valid: utilities.checkValidity(
          event.target.value,
          this.state.controls[inputIdentifier].validation
        ),
        touched: true
      }
    );
    const updatedForm = utilities.updateObject(this.state.controls, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ controls: updatedForm, formIsValid: formIsValid });
  };

  authenticate = event => {
    event.preventDefault();
    this.props.onAuthInit(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.isSignUp
    );
  };

  switchAuthModeHandler = event => {
    event.preventDefault();
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };
  render() {
    let redirect = null;
    if (this.props.isAuthenticated) {
      if (this.props.isBuilding) {
        redirect = <Redirect to="/checkout" />;
      } else {
        redirect = <Redirect to="/" />;
      }
    }
    let form = <Spinner />;
    if (!this.props.loading) {
      form = (
        <form onSubmit={this.authenticate} className={styles.Auth}>
          {Object.keys(this.state.controls).map(igKey => {
            const obj = this.state.controls[igKey];
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
                changed={event => this.inputChangedHandler(event, igKey)}
              />
            );
          })}
          <Button type="Success">
            {this.state.isSignUp ? "SIGN UP" : "SIGN IN"}
          </Button>
          <Button clicked={this.switchAuthModeHandler} type="Danger">
            Switch to {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
          </Button>
        </form>
      );
    }
    return (
      <div>
        {redirect}
        {form} {this.props.error ? <p>{this.props.error}</p> : null}
      </div>
    );
  }
}

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
