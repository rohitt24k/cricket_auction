/* eslint-disable react/prop-types */
import { useState } from "react";
import data_context from "./data_context";

function Data_context_provider({ children }) {
  const [data, setData] = useState([
    {
      name: "Rohit Kumar",
      dept: "CSE",
      year: "2022",
      role_description: "All rounder",
    },
  ]);
  const [selected, setSelected] = useState(0);
  return (
    <data_context.Provider value={{ data, selected, setSelected }}>
      {children}
    </data_context.Provider>
  );
}

export default Data_context_provider;
