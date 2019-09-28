import React, { Component } from "react";
import Aux from "../Aux/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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
          <Toolbar sideDrawerHandler={this.sideDrawerHandler} />
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerHandler}
          />
        </div>
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
