import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCartBooks } from "../util/Firebase/getCart";
import { deleteCatBook } from "../util/Firebase/deleteCratBook";
import styles from "../styles/cart.module.scss";

const Cart = () => {
  const [cartValue, setCartValue] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const router = useRouter();
  useEffect(() => {
    getCartBooks("I7PXmd8olYKMk0SYEnuP").then((value) => {
      setCartValue(value);
    });
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
  // console.log(cartPrice);
  // console.log(cartValue.length);
  return (
    <div className={styles.overall}>
      <h2 className={styles.userName}>XXXさんのカート</h2>
      {/*TODO:データベースにあるカートの中身を引っ張ってくる */}
      {/* TODO:カートの中身が無かった場合とあった場合でレイアウトの変更 */}
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
                        deleteCatBook("I7PXmd8olYKMk0SYEnuP", value.Book.isbn).then((value) => {
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
              <p>ショッピングカートをご利用ください！<br/>気になる本などを追加しましょう！</p>
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
    </div>
  );
};
export default Cart;
