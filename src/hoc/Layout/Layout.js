import React, { Component } from "react";
import Aux from "../Aux/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerHandler = bool => {
    this.setState({ showSideDrawer: bool });
  };

  render() {
    return (
      <Aux>
        <div>
          <Toolbar
            sideDrawerHandler={this.sideDrawerHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </div>
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

export default connect(mapStateToProps)(Layout);
