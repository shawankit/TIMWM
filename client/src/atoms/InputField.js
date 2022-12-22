import PropTypes from "prop-types";
import { useState } from "react";
import Text from "./Text";

const InputField = ({
  disabled,
  error,
  isRequired,
  register = () => {},
  id,
  name,
  type,
  maxLength = 256,
  placeholder,
  variant = "outlineBottom",
  bg = "bg-lightGrey",
  fontSize = "text-base",
  borderColor = "border-gray-200",
  borderRadius = "rounded",
  className = "",
  onClick,
  value = "",
  defaultValue,
  onChangeValue = () => {},
  inputLength,
  getValues,

}) => {
  const inputStyleType = {
    normal: "normal",
    outline: "outline",
    outlineBottom: "outlineBottom",
    error: "error",
  };

  const inputStyle = {
    normal: "border-0",
    outline: "border-gray-200",
    outlineBottom: "border-b-gray-400",
    error: "border-error border-b-error",
  };

  return (
    <div className="w-full mb-6">
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        variant={inputStyleType[variant]}
        className={`${
          inputStyle[variant]
        } w-full border text-gray-900 h-12 px-4 outline-none placeholder:text-grey-400 ${bg} ${borderRadius} ${fontSize} ${className} ${
          disabled && "opacity-60 pointer-events-none"
        } ${error ? " border border-error border-b-error" : ""}`}
        disabled={disabled !== undefined ? disabled : false}
        maxLength={maxLength}
        onChange={(e) => {
          onChangeValue(e);
        }}
        defaultValue={defaultValue}
      />
      {error && (
        <div className="text-sm text-error pt-1">
          {error.length != 0 && error.message}
        </div>
      )}
      {inputLength && (
        <Text className="text-xs text-gray-400 absolute bottom-2 right-2">
          {inputValue.length}/{inputLength}
        </Text>
      )}
    </div>
  );
};

export default InputField;

InputField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  register: PropTypes.func,
  maxLength: PropTypes.number,
  bg: PropTypes.string,
  fontSize: PropTypes.string,
  borderColor: PropTypes.string,
  borderRadius: PropTypes.string,
};
