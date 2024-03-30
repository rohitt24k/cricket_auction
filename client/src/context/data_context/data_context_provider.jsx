/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import data_context from "./data_context";
import axios from "axios";
import user_context from "../user_context/user_context";
// {
//   "name": "Satwik Roy",
//   "email": "satwikroy2004@gmail.com",
//   "department": "ECE",
//   "year": "1st",
//   "role": "Fast bowler",
//   "base_price": 500,
//   "image": "https://drive.google.com/open?id=1m_lhZyc6h5D3Zwt5yU4plxzGthxBg94z"
// }

const url = "https://cricket-auction-jxb1.onrender.com/";
// const url = "http://localhost:3000/";

function Data_context_provider({ children }) {
  const [data, setData] = useState([]);
  const [team, setTeam] = useState([]);
  const { team_name, handle_point_refetch } = useContext(user_context);

  //fetching all the players from the backend
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url + "player_view");
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
      const response = await axios.get(url + "team");
      // console.log(response.data);
      setTeam(response.data);
    } catch (error) {
      console.log("there was an error fetching team data", error);
    }
  }

  useEffect(() => {
    fetch_team_data();
  }, []);

  useEffect(() => {
    const data = team.find((d) => {
      return d.name === team_name;
    });
    if (data.points) {
      handle_point_refetch(data.points);
    }
  }, [team]);

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
