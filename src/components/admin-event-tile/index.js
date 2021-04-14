import React from "react";
import "./style.css";

export default function AdminEventTile({ title, desc, time, location }) {
  return (
    <div className='eventTile'>
      <a
        href='https://www.meetup.com/Technology-Meetup-India/events/277373901'
        className='eventName'
      >
        {title}
      </a>
      <p className='eventTime'>{time}</p>
      <p className='eventDesc'>{desc}</p>
      <p className='eventDesc'>{location}</p>

      <div>
        <a target='_blank' rel='noreferrer' className='eventAddToCalenderBtn'>
          Approve
        </a>

        <a target='_blank' rel='noreferrer' className='eventAddToCalenderBtn'>
          Delete
        </a>
      </div>
    </div>
  );
}
