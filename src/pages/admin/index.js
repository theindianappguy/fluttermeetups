import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AdminEventTile from "../../components/admin-event-tile";
import { UserContext } from "../../contexts/user-context";
import "./style.css";

import { getAdminEvents } from "../../services/database";
import { toDateTime } from "../../funcions";

export default function AdminPage() {
  const [user, setUser] = useContext(UserContext).user;
  const [events, setevents] = useState([]);
  let history = useHistory();

  function sendToUrl(string) {
    history.push(string);
  }

  //check if admin email if not send to home.
  if (user?.uid !== "N5siU8Wi1OXoLg6TtjNxHp4tOIl2") sendToUrl("/");

  const getSetEvents = async () => {
    let [fetchedEvents, _last] = await getAdminEvents();
    console.log(`these are the fetched ideas: ${fetchedEvents}`);
    setevents(fetchedEvents);
  };

  useEffect(() => {
    getSetEvents();
  }, []);

  return (
    <div className='adminPage'>
      <div className='container'></div>
      <div style={{ marginTop: "32px" }}>
        {events.map(({ id, event }) => {
          return (
            <div key={event["name"]}>
              <AdminEventTile
                id={id}
                title={event["name"]}
                desc={event["desc"]}
                link={event["link"]}
                time={`${toDateTime(event["date"]["seconds"])}`}
                verified={event["verified"]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// new Date(event["date"]["seconds"]).toDateString() +
// " at " +
// new Date(event["date"]["seconds"]).toLocaleTimeString()
