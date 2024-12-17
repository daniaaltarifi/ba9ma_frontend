import React, { useState } from "react";

const Tabs = ({ children }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="tabs-container">
      <div className="tabs">
        {children.map((tab, index) => (
          <button
            key={index}
            className={`tab ${selected === index ? "selected" : ""}`}
            onClick={() => setSelected(index)}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="tabs_cont_coursedetails">
        {children[selected]}
      </div>
    </div>
  );
};

export default Tabs;
