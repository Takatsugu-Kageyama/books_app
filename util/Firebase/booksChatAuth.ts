import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";

//!Firebaseに本単体のチャットがあるかを確認して真偽値を返す
export const isBooksChats = async (booksIsbn: any) => {
  //参照先
  const booksDocRef = doc(db, "Books", booksIsbn); //!本単体の参照先
  // const chatsCollectionRef = collection(db, "Books", booksIsbn, "Chats"); //!本単体のチャット参照先
  //データベースを得る
  const booksDocSnap = await getDoc(booksDocRef); //!本単体が持つデータの取得
  //クリックした本のデータベースが存在するかどうかを確認する
  if (booksDocSnap.exists()) {
    //!もし本単体のデータベースがあった場合
    const booksChatsData = booksDocSnap.data().Chats; //!チャットが格納される配列
    if (booksChatsData.length === 0) {
      return false;
    } else {
      return booksChatsData;
    }
  } else {
    //!本単体のデータベースが無い場合
    await setDoc(booksDocRef, { Chats: [] }); //!本のデータベースとチャットのオブジェクトを追加
    return false;
  }
};
