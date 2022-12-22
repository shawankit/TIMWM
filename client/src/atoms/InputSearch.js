import React from "react";
import PropTypes from "prop-types";


const InputSearch = ({
  inputWidth = "",
  disabled,
  error,
  isRequired,
  register = () => {},
  id,
  name,
  type,
  maxLength = 256,
  placeholder,
  bg = "bg-lightGrey",
  fontSize = "text-base",
  borderColor = "border-gray-200",
  borderRadius = "rounded",
  className = "",
  onClick,
  value = "",
  onChange,
  onClearSearch,
  ...property
}) => {
  return (
    <div className={`relative w-full ${inputWidth}`}>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full border text-gray-900 h-12 px-4 pr-10 outline-none placeholder:text-grey-400 ${bg} ${borderColor} ${borderRadius} ${fontSize} ${className}`}
        disabled={disabled !== undefined ? disabled : false}
        maxLength={maxLength}
        value={value}
        {...register(id)}
        {...property}
        onChange={(val) => onChange(val)}
      />
      <div className="absolute top-3.5 right-4">
        {value === "" ? (
          <img
            src="/images/icons/search.svg"
            width="20"
            height="20"
            alt="search"
          />
        ) : (
          <div onClick={onClearSearch}>
            <img
              src="/images/icons/close.svg"
              width="20"
              height="20"
              alt="search"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSearch;

InputSearch.propTypes = {
  inputWidth: PropTypes.string,
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
