import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";

//!ユーザが入力したチャットをデータベースに送信する
export const sentBooksChat = async (booksIsbn: any, typedText: string) => {
  const booksDocRef = doc(db, "Books", booksIsbn); //!本単体の参照先
  //!データベースに送るチャットオブジェクトの構成
  const ChatsData = {
    Chat: {
      userName: "ブックトーク公式",
      userId: "@BOOKTALK_official",
      userIcon: "./images/icon.png",
      time: "1時間前",
      text: typedText,
    },
  };
  //!データの送信
  await updateDoc(booksDocRef, { Chats: arrayUnion(ChatsData) });
};
