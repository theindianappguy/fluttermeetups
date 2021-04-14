import React from "react";
import { toggleEventVerification, deleteEvent } from "../../services/database";
import "./style.css";

export default function AdminEventTile({
  id,
  title,
  desc,
  time,
  link,
  location,
  verified,
}) {
  return (
    <div className='eventTile'>
      <a href={link} className='eventName'>
        {title}
      </a>
      <p className='eventTime'>{time}</p>
      <p className='eventDesc'>{desc}</p>
      <p className='eventDesc'>{location}</p>

      <div>
        <a
          onClick={() => toggleEventVerification(id, verified)}
          target='_blank'
          rel='noreferrer'
          className='adminEvent__rejectApprove'
          style={{ backgroundColor: verified ? "#da552e" : "#53c645" }}
        >
          {verified ? "Reject" : "Approve"}
        </a>

        <a
          onClick={() => deleteEvent(id)}
          target='_blank'
          rel='noreferrer'
          className='adminEvent__delete'
        >
          Delete
        </a>
      </div>
    </div>
  );
}
