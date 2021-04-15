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
  let last_visible_event_doc;

  await db
    .collection("events")
    .where("verified", "==", true)
    //.orderBy("date", "desc")
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
