import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAUZ3wk68qUN08BPJI_rW-sxKvsdN1B60E",
  authDomain: "fluttermeetups-bd18e.firebaseapp.com",
  projectId: "fluttermeetups-bd18e",
  storageBucket: "fluttermeetups-bd18e.appspot.com",
  messagingSenderId: "300577216931",
  appId: "1:300577216931:web:10027bba040d3e01be2216",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider, storage };
