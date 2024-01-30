import React, { useState } from "react";

const Accordion = ({ title, children, customClass }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={`accordion-wrapper`}>
      <div
        className={`accordion-title ${
          isOpen ? `open  ${customClass}` : `${customClass}`
        }`}
        onClick={() => setOpen(!isOpen)}
      >
        {title}
      </div>
      <div
        className={`accordion-item ${
          !isOpen ? `collapsed ${customClass}` : `${customClass}`
        }`}
      >
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
