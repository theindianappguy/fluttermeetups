import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AdminEventTile from "../../components/admin-event-tile";
import { UserContext } from "../../contexts/user-context";
import "./style.css";

import { getEvents } from "../../services/database";

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
    let [fetchedEvents, _last] = await getEvents();
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
                title={event["name"]}
                desc={event["desc"]}
                time='Saturday, April 24, 2021'
              />
            </div>
          );
        })}

        <AdminEventTile
          title='Flutter JS Meetup'
          desc='Greetings!
As promised, we are here to make your 2021 a knowledge packed year and a year full of new learnings.

We are happy to announce our next virtual session on "Flutter JS" based on the inputs received from the participants.

Grab this opportunity at the earliest and register yourself free for this meetup and improve your skills.'
          time='Saturday, April 24, 2021'
        />

        <AdminEventTile
          title='Flutter JS Meetup'
          desc='Greetings!
As promised, we are here to make your 2021 a knowledge packed year and a year full of new learnings.

We are happy to announce our next virtual session on "Flutter JS" based on the inputs received from the participants.

Grab this opportunity at the earliest and register yourself free for this meetup and improve your skills.'
          time='Saturday, April 24, 2021'
        />
      </div>
    </div>
  );
}
