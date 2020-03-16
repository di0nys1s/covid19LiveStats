import React from "react";
import Header from "./components/Header";
import Stats from "./components/Stats";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Header country="Turkey" />
      <Stats />
    </div>
  );
}

export default App;
