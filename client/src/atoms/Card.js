import React from "react";
import PropTypes from "prop-types";

const Card = ({
  cardClass = "",
  cardWidth = "",
  cardBg = "bg-white",
  cardBorder = "border",
  cardBorderColor = "border-gray-200",
  cardRadius = "rounded-2xl",
  cardPadding = "",
  cardShadow = "",
  children,
  cardHeight = "",
  onClick,
}) => {
  return (
    <div
      className={`${cardWidth} ${cardHeight} ${cardBg} ${cardBorder} ${cardBorderColor} ${cardRadius} ${cardPadding} ${cardShadow} ${cardClass} `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;

Card.propTypes = {
  cardClass: PropTypes.string,
  cardWidth: PropTypes.string,
  cardBg: PropTypes.string,
  cardBorder: PropTypes.string,
  cardBorderColor: PropTypes.string,
  cardRadius: PropTypes.string,
  cardPadding: PropTypes.string,
  cardShadow: PropTypes.string,
};
