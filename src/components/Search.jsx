import React from "react";

const Search = (props) => {
  return (
    <div className="ui input search-text">
      <input
        type="text"
        name=""
        id=""
        value={props.value}
        onChange={props.onChange}
        placeholder="Search Country..."
      />
    </div>
  );
};

export default Search;
