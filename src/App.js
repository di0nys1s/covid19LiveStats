import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPAge, setItemPerPage] = useState(10);

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
        console.log("lastChecked :", lastChecked);
        setData(covid19Stats);
        setLoading(false);
      } catch (err) {
        console.log("Error :", err);
      }
    }
    getData();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="ui header">Covid19 Statistics</h1>
      </div>
      <div className="stats">
        <div className="wrapper"></div>
        <Table items={data} loading={loading} />
      </div>
    </div>
  );
}

export default App;
