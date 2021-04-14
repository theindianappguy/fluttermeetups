import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  //------------------------------------ constants hooks

  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user: [user, setUser],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
