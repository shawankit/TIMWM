import PropTypes from "prop-types";

const Avatar = ({
  className = "",
  avatarSrc = "",
  avatarWidth = "",
  avatarHeight = "",
  avatarAlt = "",
  avatarClassName = "",
  avatarBg = "bg-gray-200",
  avatarTextClass = "text-primary-600",
  iconWidth = "w-10",
  iconHeight = "h-10",
  avatarTitle = "",
  avatarOnClick = () => {},
  children,
}) => {
  const myLoader = ({ src }) => src;
  return (
    <div
      className={`flex justify-center items-center text-center rounded-full ${iconWidth} ${iconHeight} ${avatarBg} overflow-hidden ${avatarTextClass} text-base ${className}`}
    >
      {avatarSrc ? (
        <img
          loader={myLoader}
          onClick={avatarOnClick}
          src={avatarSrc}
          width={avatarWidth}
          height={avatarHeight}
          className={`w-full h-full object-cover ${avatarClassName}`}
          alt={avatarAlt}
        />
      ) : (
        <span
          className={`font-bold leading-10 align-middle ${avatarTextClass} group-hover:table-cell`}
        >
          {avatarTitle}
        </span>
      )}
    </div>
  );
};

export default Avatar;

Avatar.propTypes = {
  className: PropTypes.string,
  iconWidth: PropTypes.string,
  iconHeight: PropTypes.string,
  avatarSrc: PropTypes.string,
  avatarWidth: PropTypes.number,
  avatarHeight: PropTypes.number,
  avatarAlt: PropTypes.string,
  avatarClassName: PropTypes.string,
  avatarBg: PropTypes.string,
  avatarTextClass: PropTypes.string,
  avatarTitle: PropTypes.string,
  avatarOnClick: PropTypes.func,
};
