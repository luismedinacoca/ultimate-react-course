import { useState } from "react";

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {/* children with curly braces => it's an object */}
      {isOpen && children}
    </div>
  );
};

export default Box;
