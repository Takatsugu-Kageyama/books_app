import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { UserSchema } from "../TypeDefinition/UserDataSchema";
import { getUserData } from "./getUserData";

//!ユーザが入力したチャットをデータベースに送信する
// export const sentBooksChat = async (userId: any, booksIsbn: any, typedText: string) => {
//   //!ユーザーのデータを得る
//   getUserData(userId).then(async (userValue) => {
//     const booksDocRef = doc(db, "Books", booksIsbn); //!本単体の参照先
//     //!データベースに送るチャットオブジェクトの構成
//     const ChatsData = {
//       Chat: {
//         userName: userValue.name,
//         userId: userValue.account,
//         userIcon: "./images/icon.png",
//         text: typedText,
//       },
//     };
//     //!データの送信
//     await updateDoc(booksDocRef, { Chats: arrayUnion(ChatsData) });
//   });
// };

export const sentBooksChat = async (userId: any, booksIsbn: any, typedText: string) => {
  const booksDocRef = doc(db, "Books", booksIsbn); //!本単体の参照先
  const userDocRef = doc(db, "User", userId); //!ユーザデータの参照先
  const userDocSnap = await getDoc(userDocRef);
  //!ユーザーのデータがあるかどうか確認
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
