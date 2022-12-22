import PropTypes from "prop-types";

const InputLabel = ({
  labelFor = "",
  variant = "medium",
  textColor = "text-gray-900",
  fontWeight = "font-bold",
  className = "block mb-2",
  children,
  labelDisable = false,
}) => {
  const InputLabelType = {
    small: "small",
    medium: "medium",
    large: "large",
  };

  const InputLabelStyle = {
    small: "text-sm",
    medium: "text-base font-bold",
    large: "text-lg",
  };

  return (
    <label
      htmlFor={`${labelFor}`}
      variant={InputLabelType[variant]}
      className={`${
        InputLabelStyle[variant]
      } ${textColor} ${fontWeight}  ${className} ${
        labelDisable && "opacity-60 pointer-events-none"
      }`}
    >
      {children}
    </label>
  );
};

export default InputLabel;

InputLabel.propTypes = {
  labelFor: PropTypes.string,
  variant: PropTypes.string,
  textColor: PropTypes.string,
  fontWeight: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
