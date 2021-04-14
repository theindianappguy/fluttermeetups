import React, { useContext, useEffect, useState } from "react";
import EventTile from "../../components/event-tile";
import "./index.css";

import { signInWithGoogle } from "../../services/auth";
import { UserContext } from "../../contexts/user-context";
import { useHistory } from "react-router-dom";

import { getEvents } from "../../services/database";

export default function HomePage() {
  const [user, setUser] = useContext(UserContext).user;
  const [events, setevents] = useState([]);

  let history = useHistory();

  function sendToUrl(string) {
    history.push(string);
  }

  const onSignInBtnClick = async () => {
    let user = await signInWithGoogle();
    if (user) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      sendToUrl("/submit");
    }
    console.log(`user we get on signin : ${user}`);
  };

  const getSetEvents = async () => {
    let [fetchedEvents, _last] = await getEvents();
    console.log(`these are the fetched ideas: ${fetchedEvents}`);
    setevents(fetchedEvents);
  };

  useEffect(() => {
    getSetEvents();
  }, []);

  return (
    <div className='homePage'>
      <div className='container'>
        <div className='hero__title'>An Open List of Flutter Events</div>
        <h4 className='hero__subtitle'>
          Events are sourced from Meetup.com or can be added manually with
          approval
        </h4>
        <div
          className='hero__cta'
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <input className='hero__ctaInput' placeholder='Email address' />
            <button className='hero_ctaButton'>Get Updates</button>
          </div>

          <p className='here__ctaSubmitEvent' onClick={onSignInBtnClick}>
            Submit Event
          </p>
        </div>

        <p className='hero__txt'>
          Every event is a chance to learn something awesome and to keep up with
          latest updates ultimately making you a better web developer
        </p>

        <div style={{ marginTop: "32px" }}>
          {events.map(({ id, event }) => {
            return (
              <div key={event["name"]}>
                <EventTile
                  title={event["name"]}
                  desc={event["desc"]}
                  time='Saturday, April 24, 2021'
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
