import React from "react";
import Todolist from "./Todolist";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Todolist />
    </div>
  );
}

export default App;
