import PropTypes from "prop-types";

const RadioButton = ({
  id,
  name,
  className,
  handleChange,
  isSelected,
  value,
  radioLabel,
  hideLabel,
  radioDisable = false,
  radioLabelPos = "right",
  labelClassName = "text-base font-bold",
}) => {
  return (
    <div
      className={`relative inline-flex items-center -mx-2  cursor-pointer ${
        radioLabelPos == "left" ? "flex-row-reverse" : ""
      } ${radioDisable && "opacity-60 pointer-events-none"}`}
    >
      <input
        id={id}
        name={name}
        onChange={handleChange}
        value={value}
        type="radio"
        checked={isSelected}
        className={`absolute opacity-0 w-full h-full left-0 top-0 z-10 cursor-pointer border border-gray-300 ${className}`}
      />
      <span
        className={`flex justify-center items-center relative w-6 h-6 mx-2 rounded-full bg-lightGrey border before:none before:w-3 before:h-3 before:rounded-full before:bg-lightGrey ${
          isSelected
            ? "bg-primary-500 border-primary-500 before:flex"
            : "border-gray-300"
        }`}
      ></span>
      <span className={`mx-2 ${labelClassName}`}>
        {!hideLabel ? radioLabel : ""}
      </span>
    </div>
  );
};

export default RadioButton;

RadioButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  handleChange: PropTypes.func,
  isSelected: PropTypes.bool,
  value: PropTypes.string,
  radioLabel: PropTypes.string,
  hideLabel: PropTypes.bool,
  radioDisable: PropTypes.bool,
  radioLabelPos: PropTypes.oneOf(["left", "right"]),
};
