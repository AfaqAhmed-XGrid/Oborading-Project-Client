import React from "react";
import "./SpecialButton.css";
type Props = {
  onClick: () => any;
  title: string;
};

const SpecialButton = ({ onClick, title }: Props) => {
  return (
    <div>
      <button
        className="btn"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        {title}
      </button>
    </div>
  );
};

export default SpecialButton;
