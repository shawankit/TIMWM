import React from "react";
import PropTypes from "prop-types";

const Text = ({ className = "", children, whiteSpace = "normal", onClick }) => {
  return (
    <p className={`${className}`} style={{ whiteSpace }} onClick={onClick}>
      {children}
    </p>
  );
};

export default Text;

Text.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
  whiteSpace: PropTypes.string,
};
