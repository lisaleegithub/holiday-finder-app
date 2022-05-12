import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
    return (<nav className="nav">
        <li>
            {" "}
        <Link to="/home">Home</Link>{" "}
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
    </nav>
    )
}