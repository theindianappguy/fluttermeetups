import React, { useEffect } from "react";
import EventTile from "../../components/event-tile";
import "./index.css";

export default function HomePage() {
  async function getEvents() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      "XSRF-TOKEN=eyJpdiI6Im9XTUxVRDJuakVSUGxcLzlsbFp2WEdBPT0iLCJ2YWx1ZSI6IkdEb2QwOWdLWGRhdTRZWWlTNkI2RjZBUGltXC9IMkZXVXNpbEY4SmVZWnhuMFVBYzdvRGI4WEJuSWJMaGhjK1l2IiwibWFjIjoiY2YyOTFlMjc3M2ViZDg5Mzk4YWFiZTBjNzIxZjhhNzE4YTUzYzM4NGRjMTMzYTU3Y2VmYjIwMjEwOGQ3MzFmNiJ9; laravel_session=eyJpdiI6InFrd3hpb0VxNlJ4M3orTHpzOXR3aHc9PSIsInZhbHVlIjoibEF4MFRCaTJPM0hlaGVMdXRyejZuUmxDRkFoTkdIQzZSNVhqcnY5eXhvK3dFaUhCSktpNU92STlJY0QyZ25QbSIsIm1hYyI6ImU0ZDI5ZGI5NzVlZTcwNDJhOTBlYTRiYTY3M2E5YjYyY2VjMGU2OTlkOGY1YWQ2YTMzYjg1NTE1ZDk2Y2EyZjkifQ%3D%3D"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      mode: "no-cors",
    };

    fetch("https://flutterevents.com/feed", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(`result: ${result}`);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className='homePage'>
      <div className='container'>
        <div className='hero__title'>An Open List of Flutter Events</div>
        <h4 className='hero__subtitle'>
          Events are sourced from Meetup.com or can be added manually
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

          <p className='here__ctaSubmitEvent'>Submit Event</p>
        </div>

        <p className='hero__txt'>
          Every event is a chance to learn something awesome and to keep up with
          latest updates ultimately making you a better web developer
        </p>

        <div style={{ marginTop: "32px" }}>
          <EventTile
            title='Flutter JS Meetup'
            desc='Greetings!
As promised, we are here to make your 2021 a knowledge packed year and a year full of new learnings.

We are happy to announce our next virtual session on "Flutter JS" based on the inputs received from the participants.

Grab this opportunity at the earliest and register yourself free for this meetup and improve your skills.'
            time='Saturday, April 24, 2021'
          />

          <EventTile
            title='Flutter JS Meetup'
            desc='Greetings!
As promised, we are here to make your 2021 a knowledge packed year and a year full of new learnings.

We are happy to announce our next virtual session on "Flutter JS" based on the inputs received from the participants.

Grab this opportunity at the earliest and register yourself free for this meetup and improve your skills.'
            time='Saturday, April 24, 2021'
          />

          <EventTile
            title='Flutter JS Meetup'
            desc='Greetings!
As promised, we are here to make your 2021 a knowledge packed year and a year full of new learnings.

We are happy to announce our next virtual session on "Flutter JS" based on the inputs received from the participants.

Grab this opportunity at the earliest and register yourself free for this meetup and improve your skills.'
            time='Saturday, April 24, 2021'
          />
        </div>
      </div>
    </div>
  );
}
