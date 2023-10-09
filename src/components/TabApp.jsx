import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import App from "../App";
import Home from "./Home";

function TabApp() {
  const [value, setValue] = useState("one");

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="one" label="Home" />
        <Tab value="two" label="Todolist" />
      </Tabs>
      {value === "one" && (
        <div>
          <Home />
        </div>
      )}
      {value === "two" && (
        <div>
          <App />
        </div>
      )}
    </div>
  );
}
export default TabApp;
