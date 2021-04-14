import React, { useContext, useState } from "react";
import "./style.css";
import { UserContext } from "../../contexts/user-context";

import DatePicker from "react-date-picker";
import { useHistory } from "react-router-dom";

import { uploadEventInfo } from "../../services/database";

export default function SubmitEventPage() {
  const [user, setUser] = useContext(UserContext).user;

  const [date, setDate] = useState(new Date());
  const [loading, setloading] = useState(false);

  const [address, setaddress] = useState("");
  const [desc, setdesc] = useState("");
  const [isOnline, setisOnline] = useState(false);
  const [link, setlink] = useState("");
  const [name, setname] = useState("");

  let history = useHistory();

  function sendToUrl(string) {
    history.push(string);
  }

  const onSubmit = async () => {
    // show loading...
    setloading(true);

    //upload event info to firebase
    var EventInfo;
    EventInfo = {
      address,
      date,
      desc,
      isOnline,
      link,
      name,
      verified: false,
    };

    await uploadEventInfo(user.uid, EventInfo);

    // send use to home
    sendToUrl("/");
  };

  return (
    <>
      <div className='submitEvent'>
        <div className='container'>
          <h2 className='submitEvenet__title'>Submit a Flutter Event</h2>
          <p className='submitEvenet__subtitle'>
            Once approved your banner will be shown to people who are near the
            event
          </p>
          {loading ? (
            <div style={{ padding: "32px 0px" }}>
              <p>Loading...</p>
            </div>
          ) : (
            <div className='submitEvent__inputContainer'>
              <p className='submitEvent__label'>Event Name *</p>
              <input
                onChange={(e) => setname(e.target.value)}
                className='submitEvent__input'
                placeholder='Event Name'
              />

              <p className='submitEvent__label'>Event Link *</p>
              <input
                onChange={(e) => setlink(e.target.value)}
                className='submitEvent__input'
                placeholder='Event Link'
              />

              <p className='submitEvent__label'>Event Type *</p>

              <div
                style={{
                  marginBottom: "16px",
                  marginTop: "8px",
                  fontSize: "16px",
                }}
              >
                <label className='submitEvent__checkboxLabel'>
                  <input
                    type='checkbox'
                    className='submitEvent__checkbox'
                    placeholder='Event Type'
                  />
                  Online
                </label>

                <label className='submitEvent__checkboxLabel'>
                  <input
                    type='checkbox'
                    className='submitEvent__checkbox'
                    placeholder='Event Type'
                  />
                  In Person
                </label>
              </div>

              {/* If In Person */}
              <p className='submitEvent__label'>Event Address *</p>
              <input
                onChange={(e) => setaddress(e.target.value)}
                className='submitEvent__input'
                placeholder='Event Address'
              />

              <p className='submitEvent__label'>Event Date *</p>
              <DatePicker
                onChange={setDate}
                value={date}
                minDate={new Date()}
              />

              <p className='submitEvent__label'>Event Description *</p>
              <textarea
                onChange={(e) => setdesc(e.target.value)}
                className='submitEvent__textarea'
                placeholder='description'
                cols='30'
                rows='5'
              />
            </div>
          )}
          <button onClick={onSubmit} className='submitEvent__submit'>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
