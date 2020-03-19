import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
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
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = event => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    console.log("searchTerm :", searchTerm);
  };

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

        let searchValue = covid19Stats.filter(a =>
          a.country.toLowerCase().includes(searchTerm)
        );

        let totalDeaths = searchValue.reduce((x, y) => {
          return x + y.deaths;
        }, 0);

        let totalConfirmed = searchValue.reduce((x, y) => {
          return x + y.confirmed;
        }, 0);

        setTotalDeaths(new Intl.NumberFormat().format(totalDeaths));
        setTotalConfirmed(new Intl.NumberFormat().format(totalConfirmed));
        setTotalDeathRate(percentageCalculator(totalDeaths, totalConfirmed));

        console.log("lastChecked :", lastChecked);

        if (searchTerm === "") {
          setLoading(false);
          setData(covid19Stats);
        } else {
          setLoading(false);
          setData(searchValue);
        }
      } catch (err) {
        console.log("Error :", err);
      }
    }
    getData();
  }, [searchTerm]);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePaginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <Header
          title="COVID19
        content"
          content="If anything kills over 10 million people in the next few decades,
              it's most likely a highly infectious virus rather than a war."
          person="Bill Gates"
          cite="TEDX, 2014"
        />
        <Navbar
          className="search"
          searchTerm={searchTerm}
          handleChange={handleChange}
          totalConfirmed={totalConfirmed}
          totalDeaths={totalDeaths}
          totalDeathRate={totalDeathRate}
        />
        <Table items={currentItem} loading={loading} />
        <Pages
          className="pagination"
          itemPerPage={itemPerPage}
          totalItems={data.length}
          handlePaginate={handlePaginate}
        />
      </div>
      <footer>di0nys1s &copy; 2020</footer>
    </div>
  );
}

export default App;
