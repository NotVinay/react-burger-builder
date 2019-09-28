import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = { error: null };
    constructor() {
      super();
      this.requestInterceptor = axios.interceptors.response.use(res => {
        this.setState({ error: null });
        return res;
      }, null);
      this.responseInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          console.log("err in interceptors", error);
          this.setState({ error: "Didn't Work" });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.request.eject(this.responseInterceptor);
    }

    modalClose = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} clicked={this.modalClose}>
            {this.state.error}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
