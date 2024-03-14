/* eslint-disable react/prop-types */
import { useState } from "react";
import UserContext from "./user_context";

function User_context_provider({ children }) {
  const [userType, setUserType] = useState("viewer");
  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
}

export default User_context_provider;
