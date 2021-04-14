import { db, storage } from "../../firebase";

export const uploadUserInfo = (userId, name, email, avatarUrl) => {
  db.collection("users").doc(userId).set({
    name: name,
    email: email,
    avatar_url: avatarUrl,
  });
};

export const uploadEventInfo = async (userId, eventMap) => {
  await db.collection("events").doc(userId).set(eventMap);
};
