import { db, storage } from "../../firebase";

export const uploadUserInfo = (userId, name, email, avatarUrl) => {
  db.collection("users").doc(userId).set({
    name: name,
    email: email,
    avatar_url: avatarUrl,
  });
};

export const uploadEventInfo = async (eventMap) => {
  await db.collection("events").add(eventMap);
};

export const getEvents = async () => {
  let fetched_events = [];
  let lastVisibleLocal;

  var eventsRef = db
    .collection("events")
    .orderBy("date")
    //.where("verified", "==", true)
    //.orderBy("date", "desc")
    .limit(2);

  await eventsRef
    .get()
    .catch(function (error) {
      console.log("error getEvents:" + error);
    })
    .then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        fetched_events.push({ id: doc.id, event: doc.data() });
        console.log(`id:${doc.id}, event:${doc.data()}`);

        lastVisibleLocal = { id: doc.id, event: doc.data() };
      });
    });

  return [fetched_events, lastVisibleLocal];
};

export const getMoreEvents = async (lastVisibleArgument) => {
  let fetched_events = [];
  let lastVisibleLocal = lastVisibleArgument;

  await db
    .collection("events")
    .doc(lastVisibleLocal.id)
    .get()
    .then(async (doc) => {
      await db
        .collection("events")
        .orderBy("date")
        .startAfter(doc)
        .get()
        .catch(function (error) {
          console.log("error getEvents:" + error);
        })
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            fetched_events.push({ id: doc.id, event: doc.data() });
            console.log(`id:${doc.id}, event:${doc.data()}`);

            lastVisibleLocal = { id: doc.id, event: doc.data() };
          });
        });
    });
  return [fetched_events, lastVisibleLocal];
};

export const getAdminEvents = async () => {
  let fetched_events = [];
  let last_visible_event_doc;

  await db
    .collection("events")
    .orderBy("date", "desc")
    .limit(5)
    .get()
    .catch(function (error) {})
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        fetched_events.push({ id: doc.id, event: doc.data() });

        last_visible_event_doc = doc.data;
      });
    });
  return [fetched_events, last_visible_event_doc];
};

export const toggleEventVerification = (eventId, verificationStatus) => {
  db.collection("events")
    .doc(eventId)
    .set({ verified: !verificationStatus }, { merge: true });
};

export const deleteEvent = (eventId) => {
  db.collection("events").doc(eventId).delete();
};
