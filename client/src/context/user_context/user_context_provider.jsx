/* eslint-disable react/prop-types */
import { useState } from "react";
import UserContext from "./user_context";

function User_context_provider({ children }) {
  const [userType, setUserType] = useState("viewer");
  const [team_name, setTeam_name] = useState("");
  return (
    <UserContext.Provider
      value={{ userType, setUserType, team_name, setTeam_name }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default User_context_provider;
