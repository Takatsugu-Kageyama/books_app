import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

type UserSchema = {
  userId: any;
  userName: string;
  userAccount: string;
  userEmail: string;
  userPassword: string;
};

//!ユーザーデータをfirebaseに送信
export const sendUserData = async (
  userId: any,
  userName: string,
  userAccount: string,
  userEmail: string,
  userPassword: string
) => {
  const userDocRef = doc(db, "User", userId); //!ユーザデータを作る参照先
  await setDoc(userDocRef, {
    CartBooks:[],
    UserData:{
      name: userName,
      account: "@" + userAccount,
      email: userEmail,
      password: userPassword,
    }
  });
};
