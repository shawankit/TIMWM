
import PropTypes from "prop-types";

const FloatingBtn = ({
  width = "w-14",
  height = "h-14",
  positionType = "fixed",
  position = "bottom-1/5 left-2/4",
  background = "bg-primary-600",
  src = "/images/icons/plus-icon.svg",
  onClick,
}) => {
  return (
    <div
      className={`rounded-full flex items-center justify-center cursor-pointer shadow-md ${width} ${height} ${positionType} ${position} ${background}`}
      onClick={onClick}
    >
      <img src={src} width="24" height="24" alt="add" />
    </div>
  );
};

export default FloatingBtn;

FloatingBtn.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  positionType: PropTypes.string,
  position: PropTypes.string,
  background: PropTypes.string,
  src: PropTypes.string,
  onClick: PropTypes.func,
};
