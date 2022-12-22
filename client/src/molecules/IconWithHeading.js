import PropTypes from "prop-types";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";

const IconWithHeading = ({
  headingChildren,
  textChildren,
  getIcon,
  onIconClick,
  headingStyle = "",
}) => {
  const myLoader = ({ src }) => src;
  return (
    <div
      className={`flex items-center ${onIconClick ? "cursor-pointer" : ""}`}
      onClick={onIconClick}
    >
      <div className="flex shrink-0 mr-2">
        {getIcon()}
      </div>
      <div>
        <Heading type="h4" className={`leading-8 ${headingStyle}`}>
          {headingChildren}
        </Heading>
        {textChildren && (
          <Text className={`text-sm font-light text-gray-500`}>
            {textChildren}
          </Text>
        )}
      </div>
    </div>
  );
};

export default IconWithHeading;
IconWithHeading.propTypes = {
  iconUrl: PropTypes.string,
  iconAlt: PropTypes.string,
  iconWidth: PropTypes.number,
  iconHeight: PropTypes.number,
  headingChildren: PropTypes.string,
  textChildren: PropTypes.string,
  onIconClick: PropTypes.func,
};
