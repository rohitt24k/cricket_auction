/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UserContext from "./user_context";
import axios from "axios";

function User_context_provider({ children }) {
  const [userType, setUserType] = useState("viewer"); //viewer || organizer || team_leader
  const [team_name, setTeam_name] = useState("");
  const [team_point, setTeam_point] = useState(150000);
  const [allTeamPoints, setAllTeamPoints] = useState(null);

  const url = "https://cricket-auction-jxb1.onrender.com/";
  // const url = "http://localhost:3000/";

  async function fetch_point(team_name) {
    const response = await axios.get(`${url}points/${team_name}`);
    const points = response.data.points;

    return points;
  }

  function fetchAllTeamPoints() {
    axios.get(`${url}points`).then((response) => {
      setAllTeamPoints(response.data);
    });
  }

  useEffect(() => {
    if (userType === "team_leader") {
      console.log("we are fetching team details...");

      const points = fetch_point(team_name);
      points.then((data) => {
        setTeam_point(data);
      });
    } else if (userType === "organizer") {
      fetchAllTeamPoints();
    }
  }, [userType]);

  function handle_point_refetch(points) {
    console.log("i m b called for", points);

    setTeam_point(points);
  }

  return (
    <UserContext.Provider
      value={{
        userType,
        setUserType,
        team_name,
        setTeam_name,
        team_point,
        handle_point_refetch,
        allTeamPoints,
        fetchAllTeamPoints,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default User_context_provider;
