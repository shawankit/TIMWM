import React, { Children } from "react";
import PropTypes from "prop-types";

const Tab = ({
  id,
  className = "",
  title,
  subTitle,
  activeTab,
  activeTabClass = "font-bold bg-gray-50",
  normalTabClass = "border-t border-gray-100",
  setActiveTab,
  children,
  isAccordion = false,
  onClick = () => {},
  isError,
  errorMessage
}) => {

  const handleClick = () => {
    if (isAccordion && id === activeTab) {
      setActiveTab("");
    } else {
      setActiveTab(id);
    }
    onClick()
  };

  return (
    <li
      key={id}
      onClick={handleClick}
      className={`p-6 cursor-pointer text-base ${className} ${
        activeTab === id ? activeTabClass : normalTabClass
      } ${isError && "text-error"}`}
    >
      {title} {children}
      <span className="text-gray-400 font-light">{subTitle}</span>
      {isError && errorMessage && <div className="text-sm text-error font-light">
          {errorMessage}
        </div>
      }
    </li>
  );
};

export default Tab;

Tab.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};
