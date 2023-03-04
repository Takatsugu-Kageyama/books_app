import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { UserSchema } from "../TypeDefinition/UserDataSchema";
import { getUserData } from "./getUserData";

export const sentBooksChat = async (userId: any, booksIsbn: any, typedText: string) => {
  const booksDocRef = doc(db, "Books", booksIsbn); //!本単体の参照先
  const userDocRef = doc(db, "User", userId); //!ユーザデータの参照先
  const userDocSnap = await getDoc(userDocRef);
  const booksDocSnap = await getDoc(booksDocRef);
  //!ユーザーのデータがあるかどうか確認
  if (!booksDocSnap.exists()) await setDoc(booksDocRef, { Chats: [] });
  
  if (userDocSnap.exists()) {
    const userData = userDocSnap.data().UserData;
    const ChatsData = {
      Chat: {
        userName: userData.name,
        userId: userData.account,
        userIcon: "./images/icon.png",
        text: typedText,
      },
    };
    await updateDoc(booksDocRef, { Chats: arrayUnion(ChatsData) });
  }
};
