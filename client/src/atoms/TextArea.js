import PropTypes from "prop-types";
import { useState } from "react";
import Text from "./Text";

const TextArea = ({
  id = "",
  name,
  placeholder,
  variant = "outlineBottom",
  bg = "bg-lightGrey",
  fontSize = "text-base",
  borderColor = "border-gray-200",
  borderRadius = "rounded",
  className = "",
  disabled,
  error,
  isRequired,
  maxLength = "",
  register = () => {},
  textAreaLength,
  getValues,
  onChangeValue = () => {},
  ...property
}) => {
  const textAreaStyleType = {
    normal: "normal",
    outline: "outline",
    outlineBottom: "outlineBottom",
    error: "error",
  };

  const textAreaStyle = {
    normal: "border-0",
    outline: "border-gray-200",
    outlineBottom: "border-b-gray-400",
    error: "border-error border-b-error",
  };
  const textAreaField = register(id);

  const fieldValue = getValues ? (getValues(id) ? getValues(id) : "") : "";

  const [textAreaValue, setTextAreaValue] = useState(fieldValue);
  return (
    <div className="w-full mb-6">
      <textarea
        id={`${id}`}
        name={`${name}`}
        variant={textAreaStyleType[variant]}
        placeholder={`${placeholder}`}
        className={`w-full border border-gray-200 rounded h-32 p-4 outline-none placeholder:text-grey-300 resize-none ${
          textAreaStyle[variant]
        } ${bg} ${borderRadius} ${fontSize} ${className} ${
          disabled && "opacity-60 pointer-events-none"
        }`}
        disabled={disabled !== undefined ? disabled : false}
        maxLength={maxLength}
        {...textAreaField}
        {...property}
        onChange={(e) => {
          if (textAreaField) {
            textAreaField.onChange(e);
          }
          setTextAreaValue(e.target.value);
          onChangeValue(e);
        }}
      ></textarea>
      {error && (
        <div className="text-sm text-error">
          {error.length != 0 && error.message}
        </div>
      )}
      {textAreaLength && (
        <Text className="text-xs text-gray-400 absolute bottom-3 right-2">
          {textAreaValue.length}/{textAreaLength}
        </Text>
      )}
    </div>
  );
};

export default TextArea;

TextArea.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};
