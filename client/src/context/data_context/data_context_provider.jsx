/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import data_context from "./data_context";
import axios from "axios";
// {
//   "name": "Satwik Roy",
//   "email": "satwikroy2004@gmail.com",
//   "department": "ECE",
//   "year": "1st",
//   "role": "Fast bowler",
//   "base_price": 500,
//   "image": "https://drive.google.com/open?id=1m_lhZyc6h5D3Zwt5yU4plxzGthxBg94z"
// }

function Data_context_provider({ children }) {
  const [data, setData] = useState([]);
  const [team, setTeam] = useState([]);

  //fetching all the players from the backend
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/player_view");
        // console.log(response);
        setData(response.data);
      } catch (error) {
        console.log("there was an error fetching player data", error);
      }
    }
    fetchData();
  }, []);

  async function fetch_team_data() {
    try {
      const response = await axios.get("http://localhost:3000/team");
      // console.log(response.data);
      setTeam(response.data);
    } catch (error) {
      console.log("there was an error fetching team data", error);
    }
  }

  useEffect(() => {
    fetch_team_data();
  }, []);

  function trigger_team_reload() {
    fetch_team_data();
  }

  return (
    <data_context.Provider value={{ data, team, trigger_team_reload, setData }}>
      {children}
    </data_context.Provider>
  );
}

export default Data_context_provider;
