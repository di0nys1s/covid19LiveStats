import React, { useState, useEffect } from "react";
import axios from "axios";

const Stats = () => {
  const [date, setDate] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [deaths, setDeaths] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  function handleChange(event) {
    const newInput = event.target.value;
    setSelectedCountry(newInput);
  }

  function handleClick(event) {
    event.preventDefault();

    getLastUpdatedDate(selectedCountry).then(data => {
      let updatedDate = new Date(data);
      let date =
        updatedDate.getDate() +
        "/" +
        updatedDate.getMonth() +
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
            0 +
            updatedDate.getMinutes();
      console.log("date :", formattedDate);
      setDate(formattedDate);
    });

    getConfirmedDeaths(selectedCountry).then(data => {
      let confirmed = data.confirmedCase;
      let deaths = data.deathCase;
      setConfirmed(confirmed);
      setDeaths(deaths);
    });
    setSelectedCountry("");
  }

  return (
    <div className="stats">
      <p>
        Country Name: <span>{selectedCountry}</span>
      </p>
      <p>
        Last Updated Date: <span>{date}</span>
      </p>
      <p>
        Confirmed Cases: <span>{confirmed}</span>
      </p>
      <p>
        Deaths Cases: <span>{deaths}</span>
      </p>

      <div className="wrapper">
        <div className="ui input focus inputText">
          <input
            onChange={handleChange}
            type="text"
            name="country"
            value={selectedCountry}
            placeholder="Search..."
            className="ui input-focus"
          />
        </div>
        <button className="ui primary button btnSubmit" onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>
  );
};

async function getLastUpdatedDate(country) {
  try {
    const response = await axios(
      `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats/?country=${country}`,
      {
        headers: {
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          "x-rapidapi-key": "4b001ab0ecmsh6d7584a5671ef4dp1da722jsn4ac7325e92ee"
        }
      }
    );
    const date = await response.data.data.lastChecked;
    return date;
  } catch (err) {
    console.log("Error :", err);
  }
}

async function getConfirmedDeaths(country) {
  try {
    const response = await axios(
      `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats/?country=${country}`,
      {
        headers: {
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          "x-rapidapi-key": "4b001ab0ecmsh6d7584a5671ef4dp1da722jsn4ac7325e92ee"
        }
      }
    );
    const confirmed = await response.data.data.covid19Stats[0].confirmed;
    const death = await response.data.data.covid19Stats[0].deaths;

    let obj = {
      confirmedCase: confirmed,
      deathCase: death
    };

    return obj;
  } catch (err) {
    console.log("Error :", err);
  }
}

export default Stats;
