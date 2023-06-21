import React from "react";
import "./Navbar.css";
import SpecialButton from "../ui/SpecialButton/SpecialButton";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="nav-main-container">
      <div className="nav-box">
        <div>
          <img src="/assets/logo.png" alt="" width={120} />
        </div>
        <div>
          <ul>
            <li>
              <Link
                to="/"
                style={{ textDecorationLine: "none", color: "black" }}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/charts"
                style={{ textDecorationLine: "none", color: "black" }}
              >
                Charts
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                style={{ textDecorationLine: "none", color: "black" }}
              >
                Users
              </Link>
            </li>
          </ul>
        </div>
        <SpecialButton title={"sign in"} onClick={() => navigate("/signin")} />
      </div>
    </div>
  );
};

export default Navbar;
