import React from "react";
import PropTypes from "prop-types";

const Video = ({ videoClass, videoSrc }) => {
  return (
    <video className={`${videoClass}`} controls>
      <source src={`${videoSrc}`} type="video/mp4" />
    </video>
  );
};

export default Video;

Video.propTypes = {
  videoClass: PropTypes.string,
  videoSrc: PropTypes.string,
};
