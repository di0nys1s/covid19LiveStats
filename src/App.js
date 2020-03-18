import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import Pages from "./components/Pages";
import axios from "axios";
import "./components/css/style.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(13);
  const [totalConfirmed, setTotalConfirmed] = useState("");
  const [totalDeaths, setTotalDeaths] = useState("");
  const [totalDeathRate, setTotalDeathRate] = useState("");

  const percentageCalculator = (x, y) => {
    return ((parseInt(x) * 100) / parseInt(y)).toFixed(2);
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await axios(
          `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats/`,
          {
            headers: {
              "x-rapidapi-host":
                "covid-19-coronavirus-statistics.p.rapidapi.com",
              "x-rapidapi-key":
                "4b001ab0ecmsh6d7584a5671ef4dp1da722jsn4ac7325e92ee"
            }
          }
        );

        const data = await response.data.data;
        const { lastChecked, covid19Stats } = data;
        console.log("covid19Stats :", covid19Stats);

        let totalDeaths = covid19Stats.reduce((x, y) => {
          return x + y.deaths;
        }, 0);

        let totalConfirmed = covid19Stats.reduce((x, y) => {
          return x + y.confirmed;
        }, 0);

        setTotalDeaths(new Intl.NumberFormat().format(totalDeaths));
        setTotalConfirmed(new Intl.NumberFormat().format(totalConfirmed));
        setTotalDeathRate(percentageCalculator(totalDeaths, totalConfirmed));

        console.log("lastChecked :", lastChecked);
        setData(covid19Stats);
        setLoading(false);
      } catch (err) {
        console.log("Error :", err);
      }
    }
    getData();
  }, []);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePaginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="header">
        <h1 className="ui header">Covid19 Statistics</h1>
      </div>
      <div className="general-stats">
        <p>
          Total Confirmed: <span>{totalConfirmed}</span>
        </p>
        <p>
          Total Deaths: <span>{totalDeaths}</span>
        </p>
        <p>
          Death Rate: <span>{totalDeathRate} %</span>
        </p>
      </div>
      <div className="stats-table">
        <Table items={currentItem} loading={loading} />
        <Pages
          itemPerPage={itemPerPage}
          totalItems={data.length}
          handlePaginate={handlePaginate}
        />
      </div>
    </div>
  );
}

export default App;
