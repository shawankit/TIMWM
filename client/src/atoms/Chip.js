import PropTypes from "prop-types";
const Chip = ({ text = "" }) => {
  return (
    <span className="inline-flex items-center justify-center bg-primary-50 rounded-full py-1 px-2 text-xs font-medium text-primary-500 m-auto border border-primary-500">
      {text}
    </span>
  );
};

Chip.propTypes = {
  type: PropTypes.string,
};

export default Chip;
