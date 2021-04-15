import React, { useState } from "react";
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
  const [verifiedLocal, setverifiedLocal] = useState(verified);
  return (
    <div className='adminEventTile'>
      <a href={link} className='adminEventName'>
        {title}
      </a>
      <p className='adminEventTime'>{time}</p>
      <p className='adminEventDesc'>{desc}</p>
      <p className='adminEventDesc'>{location}</p>

      <div>
        <a
          onClick={() => {
            toggleEventVerification(id, verifiedLocal);
            setverifiedLocal(!verifiedLocal);
          }}
          target='_blank'
          rel='noreferrer'
          className='adminEvent__rejectApprove'
          style={{ backgroundColor: verifiedLocal ? "#da552e" : "#53c645" }}
        >
          {verifiedLocal ? "Reject" : "Approve"}
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
