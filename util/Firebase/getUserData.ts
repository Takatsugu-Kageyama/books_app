import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

//!ユーザーデータをfirebaseに送信
export const getUserData = async (userId: string) => {
  const userDocRef = doc(db, "User", userId); //!ユーザデータの参照先
  const userDocSnap = await getDoc(userDocRef);
  //!ユーザーのデータがあるかどうか確認
  if (userDocSnap.exists()) {
    //!カート内の本が格納されている配列
    const userData = userDocSnap.data();
    return userData;
  }
};
