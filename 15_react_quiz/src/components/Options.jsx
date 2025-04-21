import React from "react";

const Options = ({question}) => {
  return (
    <div className="options">
      {question.options.map((option) => (
        <button type="button" className="btn btn-opition" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
