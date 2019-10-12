import React, { Component, useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);
    const requestInterceptor = axios.interceptors.response.use(res => {
      setError(null);
      return res;
    }, null);
    const responseInterceptor = axios.interceptors.response.use(
      res => res,
      error => {
        console.log("err in interceptors", error);
        setError("Didn't Work");
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.request.eject(responseInterceptor);
      };
    }, [requestInterceptor, responseInterceptor]);

    const modalClose = () => {
      setError(null);
    };
    return (
      <Aux>
        <Modal show={error} clicked={modalClose}>
          {error}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
