import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import styles from "./NavigationItems.module.css";
import Button from "../../UI/Button/Button";
const navigationItems = props => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact active>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated ? (
      [
        <NavigationItem key="orders" link="/orders">
          Orders
        </NavigationItem>,
        <NavigationItem key="logout" link="/logout">
          Logout
        </NavigationItem>
      ]
    ) : (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
