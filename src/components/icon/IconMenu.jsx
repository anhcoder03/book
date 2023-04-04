import React from "react";

const IconMenu = ({ className = "", onClick = () => {} }) => {
  return (
    <span className={className} onClick={onClick}>
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="0"
        viewBox="0 0 24 24"
        className="visible text-black right-5 top-0 flex  text-3xl transition-all hover:cursor-pointer hover:text-primary"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h8m-8 6h16"
        ></path>
      </svg>
    </span>
  );
};

export default IconMenu;
