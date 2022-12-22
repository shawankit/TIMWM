import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const CheckBox = ({
  id,
  name,
  className,
  isSelected,
  value,
  checkBoxLabel,
  hideLabel,
  checkBoxDisable = false,
  checkBoxLabelPos = "right",
  labelClassName = "text-base",
  changeRadioLayout = false,
  onChange,
  onClick
}) => {
  const [isChecked, setChecked] = useState(isSelected);
  const handleChange = (e) => {
    setChecked(!isChecked);
    onChange(e);
  };

  useEffect(() => setChecked(isSelected), [isSelected]);
  return (
    <div
      className={`relative inline-flex items-center -mx-2  cursor-pointer ${checkBoxLabelPos == "left" ? "flex-row-reverse" : ""
        } ${checkBoxDisable && "opacity-60 pointer-events-none"}`} onClick={onClick}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={handleChange}
        className={`absolute opacity-0 w-full h-full left-0 top-0 z-10 cursor-pointer border border-gray-300 ${className}`}
      />
      <span
        className={`flex justify-center items-center relative w-6 h-6 mx-2 rounded bg-lightGrey border before:none before:w-3 before:h-3 before:rounded-full  ${
          isSelected
            ? "bg-primary-500 border-primary-500 before:flex bg-checkMark bg-no-repeat bg-center"
            : "border-gray-400"
        } ${
          changeRadioLayout &&
          "flex justify-center items-center relative w-6 h-6 mx-2 rounded-full bg-lightGrey border before:none before:w-3 before:h-3 before:rounded-full before:bg-lightGrey bg-none"
        }`}
      ></span>
      <span className={`mr-2 ${labelClassName}`}>
        {!hideLabel ? checkBoxLabel : ""}
      </span>
    </div>
  );
};

export default CheckBox;

CheckBox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  handleChange: PropTypes.func,
  isSelected: PropTypes.bool,
  value: PropTypes.any,
  checkBoxLabel: PropTypes.string,
  hideLabel: PropTypes.bool,
  checkBoxDisable: PropTypes.bool,
  checkBoxLabelPos: PropTypes.oneOf(["left", "right"]),
};
