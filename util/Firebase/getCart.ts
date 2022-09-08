import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";

//!カートの中身を得る関数
export const getCartBooks = async (userId: string) => {
  //!参照先
  const userCartRef = doc(db, "User", userId);
  //!本単体が持つデータの取得
  const cartBooksDocSnap = await getDoc(userCartRef);
  //!ユーザーのデータがあるかどうか確認
  if (cartBooksDocSnap.exists()) {
    //!カート内の本が格納されている配列
    const cartBooksData = cartBooksDocSnap.data().CartBooks;
    if (cartBooksData.length === 0) {
      return false;
    } else {
      return cartBooksData;
    }
  }
};

//!カート内の本のISBN番号を得る関数
export const getCartBooksIsbn = async (userId: string) => {
  //!参照先
  const userCartRef = doc(db, "User", userId);
  //!格納されている本のIsbn番号を取得
  //!本単体が持つデータの取得
  const cartBooksIsbnDocSnap = await getDoc(userCartRef);
  //!ユーザーのデータがあるかどうか確認
  if (cartBooksIsbnDocSnap.exists()) {
    //!カート内の本が格納されている配列
    const cartBooksIsbnData = cartBooksIsbnDocSnap.data().CartBooks;
    //!isbnを格納する配列
    const cartBooksIsbn = [];
    //!isbnを配列に入れる
    for (const isbn of cartBooksIsbnData) {
      cartBooksIsbn.push(isbn.Book.isbn);
    }
    return cartBooksIsbn;
  }
};
