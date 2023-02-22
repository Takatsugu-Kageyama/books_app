import { useEffect, useState } from "react";
import { getCartBooks } from "../util/Firebase/getCart";
import { deleteCatBook } from "../util/Firebase/deleteCartBook";
import { getUserData } from "../util/Firebase/getUserData";
import { UserSchema } from "../util/TypeDefinition/UserDataSchema";
import styles from "../styles/cart.module.scss";
import { useAuthContext } from "../util/Context/AuthContext";
import Head from "next/head";

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
        setUserName(userValue.name);
      });
    }
  }, [isLoggedIn, user]);
  //!ユーザーのカート内のデータ取得
  useEffect(() => {
    if (isLoggedIn) {
      getCartBooks(user.uid).then((value) => {
        setCartValue(value);
      });
    }
  }, [cartValue, isLoggedIn, user?.uid]);
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
      <Head>
        <title>Book Talk ｜ カート</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="description" content={"あなたの探したい本が見つかるBookTalk"} />
        <meta property="og:url" content={"https://booktalk.vercel.app/Cart"} />
        <meta property="og:title" content={"BookTalk"} />
        <meta property="og:site_name" content={"BookTalk"} />
        <meta property="og:description" content={"あなたの探したい本が見つかるBookTalk"} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={"/images/icon.png"} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
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
              <h2>小計（税込み）</h2>
              <h2>
                ：￥{cartPrice}
                <span>税込み</span>
              </h2>
            </div>
            {cartValue.length ? (
              <button className={styles.cashBtn} >
                レジにすすむ
              </button>
            ) : (
              <button type="button" className={styles.cashBtn} disabled>レジにすすむ</button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Cart;
