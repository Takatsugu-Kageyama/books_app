import { doc, deleteDoc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";

export const deleteCatBook = async (userId: string, booksId: string) => {
  //!参照先
  const userDocRef = doc(db, "User", userId); //!ユーザー個人のデータベースへの参照先
  //!カートの中のデータを得る
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    //!カートの中身を得る
    const cartBooksData = userDocSnap.data().CartBooks;
    cartBooksData.forEach(async (value: any) => {
      if (value.Book.isbn === booksId) {
        await updateDoc(userDocRef, { CartBooks: arrayRemove(value) });
      }
    });
    return cartBooksData;
  }
};
