import React from "react";
import styles from "./DrawerToggle.module.css";

const drawerToggle = props => {
  return (
    <div className={styles.DrawerToggle} onClick={() => props.clicked(true)}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default drawerToggle;
