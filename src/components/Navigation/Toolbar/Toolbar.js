import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
const toolbar = props => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={props.sideDrawerHandler} />
      <div className={styles.Logo}>
        <Logo height="60%" />
      </div>
      <nav className={styles.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </header>
  );
};

export default toolbar;
