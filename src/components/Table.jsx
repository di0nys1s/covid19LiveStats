import React from "react";

const Table = ({ items, loading }) => {
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

  if (loading) {
    return (
      <div className="ui active inverted dimmer">
        <div className="ui large text loader">Loading...</div>
      </div>
    );
  }
  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th>#</th>
          <th>Country</th>
          <th>Province</th>
          <th># of Confirmed</th>
          <th># of Deaths</th>
          <th>Last Update</th>
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
            <td>{formatDate(item.lastUpdate)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
