import { useEffect, useState } from "react";
import { getCartBooks } from "../util/Firebase/getCart";
import { deleteCatBook } from "../util/Firebase/deleteCartBook";
import { getUserData } from "../util/Firebase/getUserData";
import { UserSchema } from "../util/TypeDefinition/UserDataSchema";
import styles from "../styles/cart.module.scss";
import { useAuthContext } from "../util/Context/AuthContext";

const Cart = () => {
  //!カートに入っている本のデータを得る
  const [cartValue, setCartValue] = useState([]);
  //!カートの総合計値を計算
  const [cartPrice, setCartPrice] = useState(0);
  //!ユーザーデータの取得
  const [userName, setUserName] = useState("");
  //!ユーザーの認証
  const { user } = useAuthContext();
  const isLoggedIn = !!user;

  //!ユーザーのデータ取得
  useEffect(() => {
    if (isLoggedIn) {
      getUserData(user.uid).then((userValue: UserSchema) => {
        console.log(userValue);
        setUserName(userValue.name);
      });
    }
  },[user]);
  //!ユーザーのカート内のデータ取得
  useEffect(() => {
    if (isLoggedIn) {
      getCartBooks(user.uid).then((value) => {
        setCartValue(value);
      });
    }
  }, [cartValue]);
  useEffect(() => {
    let sumPrice = 0;
    if (cartValue) {
      cartValue.forEach((value: any) => {
        sumPrice += value.Book.itemPrice;
      });
    }
    setCartPrice(sumPrice);
  }, [cartValue]);
  return (
    <div className={styles.overall}>
      <h2 className={styles.userName}>{userName !== null ? userName : ""}さんのカート</h2>
      {isLoggedIn ? (
        <div className={styles.cartsContents}>
          <div className={styles.cartsBooks}>
            {cartValue.length ? (
              cartValue.map((value: any) => {
                return (
                  <div key={value.Book.isbn} className={styles.booksBox}>
                    <div className={styles.booksImage}>
                      <img src={value.Book.largeImageUrl} alt="" />
                    </div>
                    <div className={styles.booksDetail}>
                      <div className={styles.booksContents}>
                        <h2>{value.Book.title}</h2>
                        <p className={styles.booksAuthor}>{value.Book.author}</p>
                        <p className={styles.booksPrice}>￥{value.Book.itemPrice}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault;
                          deleteCatBook(user.uid, value.Book.isbn).then((value) => {
                            setCartValue(value);
                          });
                        }}
                      >
                        カートから削除する
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.noneBooks}>
                <h2>まだ、カートには商品がありません。</h2>
                <p>
                  ショッピングカートをご利用ください！
                  <br />
                  気になる本などを追加しましょう！
                </p>
              </div>
            )}
          </div>
          <div className={styles.sumPriceBox}>
            <div className={styles.sum}>
              <h2>小計（２個の商品）（税込み）</h2>
              <h2>
                ：￥{cartPrice}
                <span>税込み</span>
              </h2>
            </div>
            <button className={styles.cashBtn}>レジにすすむ</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Cart;
