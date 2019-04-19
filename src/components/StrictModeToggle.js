import React from "react";
import PropTypes from "prop-types";

const StrictModeToggle = ({ handleToggle, strict }) => {
  return (
    <div className="onoffswitch">
      <input
        type="checkbox"
        name="onoffswitch"
        className="onoffswitch-checkbox"
        id="myonoffswitch"
        checked={strict}
        readOnly
        onChange={handleToggle}
      />
      <label className="onoffswitch-label" htmlFor="myonoffswitch">
        <span className="onoffswitch-inner" />
        <span className="onoffswitch-switch" />
      </label>
    </div>
  );
};

StrictModeToggle.propTypes = {
  strict: PropTypes.bool,
  handleToggle: PropTypes.func
};

export default StrictModeToggle;
