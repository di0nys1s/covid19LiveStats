import React from "react";

const Header = props => {
  return (
    <div className="jumbotron">
      <div class="card">
        <h5 class="card-header">{props.title}</h5>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>{props.content}</p>
            <div class="blockquote-footer">
              {props.person} in <cite title="Source Title"> {props.cite}</cite>
            </div>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Header;
