import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <a className="navbar-brand nav-name" href="/" style={{color:"#F1EAE5"}}>HOLIDAY FINDER</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to="/">Home</Link>{" "}
          </li>

          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>

          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>

        </ul>
      </div>
    </nav>
  )
}