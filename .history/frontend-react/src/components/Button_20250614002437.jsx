import React from "react";

const Button = (props) => {
  return (
    <>
      <a href="" className="btn btn-outline-info">
        {props.text}
      </a>
    </>
  );
};

export default Button;
