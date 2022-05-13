import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light sticky-top" style={{ backgroundColor: "lavender" }}>
      <a class="navbar-brand" href="/">Holiday Finder</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">

          <li class="nav-item active">
            <Link to="/">Home</Link>{" "}
          </li>

          <li class="nav-item">
            <Link to="/about">About</Link>
          </li>

          <li class="nav-item">
            <Link to="/contact">Contact</Link>
          </li>

        </ul>
      </div>
    </nav>
  )
}