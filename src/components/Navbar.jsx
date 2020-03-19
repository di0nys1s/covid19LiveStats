import React from "react";
import Search from "./Search";

const Navbar = props => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Search
        className={props.className}
        value={props.searchTerm}
        onChange={props.handleChange}
      />
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <p>
              Confirmed: <span>{props.totalConfirmed}</span>
            </p>
          </li>
          <li classNamess="nav-item">
            <p>
              Deaths: <span>{props.totalDeaths}</span>
            </p>
          </li>
          <li className="nav-item">
            <p>
              Rate: <span>{props.totalDeathRate} %</span>
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
