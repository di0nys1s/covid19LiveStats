import React from "react";

const Table = ({ items, loading, rate }) => {
  function formatDate(lastDate) {
    let updatedDate = new Date(lastDate);
    let date =
      updatedDate.getDate() +
      "/" +
      parseInt(updatedDate.getMonth() + 1) +
      "/" +
      updatedDate.getFullYear();
    let formattedDate =
      parseInt(updatedDate.getMinutes()) < 10
        ? date +
          " - " +
          updatedDate.getHours() +
          ":" +
          0 +
          updatedDate.getMinutes()
        : date +
          " - " +
          updatedDate.getHours() +
          ":" +
          updatedDate.getMinutes();
    return formattedDate;
  }

  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  const percentageCalculator = (x, y) => {
    return ((parseInt(x) * 100) / parseInt(y)).toFixed(2);
  };

  if (loading) {
    return (
      <div className="ui active inverted dimmer">
        <div className="ui large text loader">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Country</th>
            <th scope="col">Province</th>
            <th scope="col"># of Confirmed</th>
            <th scope="col"># of Deaths</th>
            <th scope="col">Death Rate %</th>
            <th scope="col">Last Update</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, id) => (
            <tr key={id}>
              <td>{id + 1}</td>
              <td>{item.country}</td>
              <td>{item.province === "" ? "---" : item.province}</td>
              <td>{formatNumber(item.confirmed)}</td>
              <td>{formatNumber(item.deaths)}</td>
              <td>{percentageCalculator(item.deaths, item.confirmed)} %</td>
              <td>{formatDate(item.lastUpdate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
