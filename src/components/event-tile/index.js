import React from "react";
import "./style.css";

export default function EventTile({ title, desc, time, location }) {
  return (
    <div className='eventTile'>
      <a
        target='_blank'
        href='https://www.meetup.com/Technology-Meetup-India/events/277373901'
        className='eventName'
      >
        {title.length > 36 ? title.substring(0, 36) + "..." : title}
      </a>
      <p className='eventTime'>{time}</p>
      <p className='eventDesc'>{desc}</p>
      <p className='eventDesc'>{location}</p>

      <a
        target='_blank'
        rel='noreferrer'
        className='eventAddToCalenderBtn'
        href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${desc}&location=${location}&dates=20210414T123900.000Z%2F20210415T123900.000Z`}
      >
        Add to Calender
      </a>
    </div>
  );
}
