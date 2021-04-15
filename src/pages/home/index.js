import React, { useContext, useEffect, useState } from "react";
import EventTile from "../../components/event-tile";
import "./index.css";
import { v4 as uuidv4 } from "uuid";

import { signInWithGoogle } from "../../services/auth";
import { UserContext } from "../../contexts/user-context";
import { useHistory } from "react-router-dom";

import { getEvents, getMoreEvents } from "../../services/database";
import { toDateTime } from "../../funcions";
import InfiniteScroll from "react-infinite-scroll-component";

export default function HomePage() {
  const [user, setUser] = useContext(UserContext).user;
  const [events, setevents] = useState([]);
  const [hasmore, sethasmore] = useState(true);
  const [lastVisible, setlastVisible] = useState();

  const [emailAddress, setemailAddress] = useState("");
  const [messageStr, setmessageStr] = useState("");

  const [formLoading, setformLoading] = useState(false);

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

  const fetchEvents = async () => {
    let [fetchedEvents, lastVisibleLocal] = lastVisible
      ? await getMoreEvents(lastVisible)
      : await getEvents();
    console.log(
      `these are the fetched ideas: ${fetchedEvents} fetchedEvents length:${fetchedEvents.length}, lastEventName:${lastVisibleLocal.event["name"]}`
    );
    setevents([...events, ...fetchedEvents]);
    setlastVisible(lastVisibleLocal);

    if (fetchedEvents.length === 0) {
      sethasmore(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const SubmitEmailConvertKit = (e) => {
    e.preventDefault();
    setformLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: emailAddress,
      api_key: "UfP8hppSlI4ODe-gV9ic0g",
    });

    setemailAddress("");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://api.convertkit.com/v3/forms/2202312/subscribe",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setmessageStr(
          "Success! Now check your email to confirm your subscription."
        );
        setformLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className='homePage'>
      {/* Header */}
      <header>
        <div
          className='container'
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className='header__logo'>
            <div className='header__logo__img'>
              <a
                style={{
                  textDecoration: "none",
                  color: "#111",
                  fontSize: "18px",
                }}
                href='https://fluttermeetups.web.app/'
              >
                Flutter Meetups
              </a>
            </div>
          </div>
          <div className='header__menu'>
            <div className='header__menu__items show-for-medium-up'>
              <a
                href='https://www.sanskar.dev'
                style={{
                  marginRight: "26px",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "#111",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                Made by
              </a>
              <a
                href='https://flutternerd.com'
                style={{
                  marginRight: "26px",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "#111",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                Flutter Blogs
              </a>
              <a
                href='https://www.youtube.com/channel/UCsPdgUIoOBTBI1UmulW1pdw'
                style={{
                  marginRight: "26px",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "#111",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                Flutter Tutorials
              </a>
            </div>
          </div>

          <div>
            <a
              href='https://github.com/theindianappguy/fluttermeetups'
              style={{
                textDecoration: "none",
                color: "#111",
                fontSize: "18px",
              }}
            >
              Github
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
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
          {messageStr !== "" && (
            <p className='success__message'>{messageStr}</p>
          )}
          {formLoading ? (
            <div className='loading__div'>
              <p>Loading...</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                SubmitEmailConvertKit(e);
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type='email'
                onChange={(e) => setemailAddress(e.target.value)}
                className='hero__ctaInput'
                placeholder='Email address'
                value={emailAddress}
              />
              <button type='submit' className='hero_ctaButton'>
                Get Updates
              </button>
            </form>
          )}

          <p style={{ fontSize: "14px", marginTop: "6px", color: "grey" }}>
            We respect your privacy. Unsubscribe at any time sngle click.
          </p>

          <p className='here__ctaSubmitEvent' onClick={onSignInBtnClick}>
            Submit Event
          </p>
        </div>

        <p className='hero__txt'>
          Every event is a chance to learn something awesome and to keep up with
          latest updates ultimately making you a better web developer
        </p>

        <InfiniteScroll
          dataLength={events.length} //This is important field to render the next data
          next={fetchEvents}
          hasMore={hasmore}
          loader={
            <div className='loading__div'>
              <p>Loading...</p>
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {events.map(({ id, event }) => {
            return (
              <div key={uuidv4()}>
                <EventTile
                  title={event["name"]}
                  desc={event["desc"]}
                  time={`${toDateTime(event["date"]["seconds"])}`}
                />
              </div>
            );
          })}
        </InfiniteScroll>

        {/* <div style={{ marginTop: "32px" }}>
          
        </div> */}
      </div>
    </div>
  );
}
