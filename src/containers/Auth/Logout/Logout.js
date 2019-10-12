import React, { Component, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

const Logout = props => {
  const { onLogout } = props;
  useEffect(() => {
    this.props.onLogout();
  }, [onLogout]);
  return (
    <div>
      <Redirect to="/" />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
