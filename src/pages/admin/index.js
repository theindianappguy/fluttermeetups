import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/user-context";

export default function AdminPage() {
  const [user, setUser] = useContext(UserContext).user;
  let history = useHistory();

  function sendToUrl(string) {
    history.push(string);
  }

  //check if admin email if not send to home.
  if (user?.uid !== "N5siU8Wi1OXoLg6TtjNxHp4tOIl2") sendToUrl("/");

  return (
    <div>
      <p>Admin Page</p>
    </div>
  );
}
