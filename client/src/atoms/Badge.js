import React from "react";
import PropTypes from "prop-types";

const Badge = ({ variant, badgeClass = "", children, onClick = () => {} }) => {
  const badgeType = {
    badgeError: "badgeError",
    badgeWarning: "badgeWarning",
    badgeInfo: "badgeInfo",
    badgeDraft: "badgeDraft",
    badgeInactive: "badgeInactive",
    badgeOutline: "badgeOutline",
  };

  const badgeStyle = {
    badgeError:
      "bg-errorLight border border-error rounded-full py-1 px-5 text-xs text-error",
    badgeWarning:
      "bg-warningLight border border-warning rounded-full py-1 px-5 text-xs text-warning",
    badgeInfo:
      "bg-infoLight border border-info rounded-full py-1 px-5 text-xs text-info",
    badgeDraft:
      "bg-gray-100 border border-gray-100 rounded-full py-1 px-2 text-sm text-gray-800",
    badgeInactive:
      "bg-gray-100 border border-gray-500 rounded-full py-1 px-7 text-sm text-gray-800",
    badgeOutline:
      "bg-gray-100 border border-gray-300 rounded-full py-1 px-2.5 text-xxs text-gray-500",
  };
  return (
    <span
      variant={badgeType[variant]}
      className={`${badgeStyle[variant]} ${badgeClass}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default Badge;

Badge.propTypes = {
  variant: PropTypes.string,
  badgeClass: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
  badgeStyle: PropTypes.string,
};
