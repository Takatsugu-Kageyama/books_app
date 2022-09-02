import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { CartBooksSchema } from "../TypeDefinition/BooksSchema";

//!本の購入ボタンがクリックされたときにデーターベースに追加
export const addCart = async ({ userId, title, author, price, image, isbn }: CartBooksSchema) => {
  const userDocRef = doc(db, "User", userId); //!ユーザー個人のデータベースへの参照先
  //!データベースに送るオブジェクトの構成
  const BooksData = {
    Book: {
      title: title,
      author: author,
      itemPrice: price,
      largeImageUrl: image,
      isbn: isbn,
    },
  };
  //!データの送信
  await updateDoc(userDocRef, { CartBooks: arrayUnion(BooksData) });
};
