import React, { Fragment } from 'react';

const ToggleDisplay = (props) => {
    return Boolean(props.if) ? (<Fragment>{props.children}</Fragment>) : null;
};

ToggleDisplay.defaultProps = {
  if:true
};

export default ToggleDisplay;