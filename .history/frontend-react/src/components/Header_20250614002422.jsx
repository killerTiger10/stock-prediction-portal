import React from "react";
import Button from "./Button";

const Header = () => {
  return (
    <>
      <nav className="navbar container pt-3 pb-3 align-items-start">
        <a href="" className="navbar-brand text-light">
          Stock Prediction Portal
        </a>
        <div>
          <Button text="Login" />
          &nbsp;
          <Button text="Register" />
        </div>
      </nav>
    </>
  );
};

export default Header;
