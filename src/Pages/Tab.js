import React from "react";

const Tab = ({ title, children }) => {
  return (
    <div className="tab-content">
      {children}
    </div>
  );
};

export default Tab;
