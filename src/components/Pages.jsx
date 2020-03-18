import React from "react";

export const Pages = ({ itemPerPage, totalItems, handlePaginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return(
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => handlePaginate(number)} href="!#" className="page-link">{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pages;
