import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom";

const Navbar = () => {
 
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />

      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
