import React from "react";
import logo from "../assets/sixt.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <header>
      <div className="head1">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <span id="span1">RENT</span>
        <span>SHARE</span>
        <span>RIDE</span>
        <span>SIXT+ Abonnement auto</span>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("Login");
          }}
        >
          BACKOFFICE
        </button>
      </div>
    </header>
  );
}

export default Header;
