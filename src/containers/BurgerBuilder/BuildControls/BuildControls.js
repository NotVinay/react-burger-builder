import React from "react";
import BuildControl from "./BuildControl/BuildControl";

const buildControls = props => {
  const transformedControls = Object.keys(props.ingredients).map(name => {
    return (
      <BuildControl
        key={"control_" + name}
        controlName={name}
        value={props.ingredients[name]}
        increaseClick={props.increaseClick}
        decreaseClick={props.decreaseClick}
      />
    );
  });
  return <div>{transformedControls}</div>;
};

export default buildControls;
