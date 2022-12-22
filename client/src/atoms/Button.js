import PropTypes from "prop-types";

const Button = ({
  type = "",
  children,
  variant,
  fontWeight = "font-medium",
  padding = "py-3 px-6",
  btnClass = "",
  imgClassName = "",
  imgSrc,
  imgWidth,
  imgHeight,
  imgAlt = "",
  onClick = () => {},
  disabled,
  form,
  buttonRef
}) => {
  const buttonType = {
    primaryBtn: "primaryBtn",
    outlineBtn: "outlineBtn",
    normalBtn: "normalBtn",
  };

  const buttonStyle = {
    primaryBtn:
      "flex items-center justify-center bg-yellow-500 rounded text-white text-base disabled:bg-primary-100 disabled:text-primary-300",
    outlineBtn:
      "flex items-center justify-center bg-transparent border border-gray-200 rounded text-gray-500 text-base drop-shadow-btn disabled:bg-primary-100 disabled:text-primary-300",
    normalBtn: "flex items-center justify-center text-base",
  };

  return (
    <button
      type={type}
      variant={buttonType[variant]}
      className={`${
        buttonStyle[variant]
      } ${fontWeight} ${padding} ${btnClass} ${imgSrc && "pl-4"}`}
      onClick={onClick}
      disabled={disabled}
      form={form}
      ref={buttonRef}
    >
      {imgSrc ? (
        <span
          className={`mx-2 flex items-center flex-shrink-0 ${imgClassName}`}
        >
          <img
            src={imgSrc}
            width={imgWidth}
            height={imgHeight}
            alt={imgAlt}
          />
        </span>
      ) : (
        ""
      )}
      {children}
    </button>
  );
};
export default Button;

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
  fontWeight: PropTypes.string,
  padding: PropTypes.string,
  btnClass: PropTypes.string,
  imgClassName: PropTypes.string,
  imgSrc: PropTypes.string,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  imgAlt: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
