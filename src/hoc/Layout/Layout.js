import React, { Component, useState } from "react";
import Aux from "../Aux/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const sideDrawerHandler = bool => {
    setShowSideDrawer(bool);
  };

  return (
    <Aux>
      <div>
        <Toolbar
          sideDrawerHandler={sideDrawerHandler}
          isAuthenticated={props.isAuthenticated}
        />
        <SideDrawer
          open={showSideDrawer}
          closed={sideDrawerHandler}
          isAuthenticated={props.isAuthenticated}
        />
      </div>
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

export default connect(mapStateToProps)(Layout);
