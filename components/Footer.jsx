import React from "react";
import { BiCopyright } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="footer">
      {new Date().getFullYear()} <BiCopyright /> all rights reserved
    </div>
  );
};

export default Footer;
