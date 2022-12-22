import React from "react";
import PropTypes from "prop-types";

const TabContent = ({tabContentId, activeTab, tabContentClass="",children}) => {
	return (
		activeTab === tabContentId ? <div id={`${tabContentId}`} className={`${tabContentClass}`}>
			{children}
		</div>
		: null
	)
}

export default TabContent;

TabContent.propTypes = {
  tabContentId: PropTypes.string,
  tabContentClass: PropTypes.string,
};
