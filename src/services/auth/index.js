import { auth, provider } from "../../firebase";
import { uploadUserInfo } from "../database";

export const signInWithGoogle = async () => {
  let user;
  await auth
    .signInWithPopup(provider)
    .then((res) => {
      console.log(res.user);
      user = res.user;

      //userId, name, email, avatarUrl
      uploadUserInfo(user.uid, user.displayName, user.email, user.photoURL);
    })
    .catch((error) => {
      console.log(error.message);
    });

  return user;
};

export const logOut = async () => {
  let logout_sucess;
  await auth
    .signOut()
    .then(() => {
      logout_sucess = true;
    })
    .catch((error) => {
      console.log(error.message);
    });

  return logout_sucess;
};
