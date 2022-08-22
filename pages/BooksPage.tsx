//スタイル
import styles from "../styles/booksPage.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const BooksPage = () => {
  const router = useRouter();
  const [clickedBooksValue, setClickedBooksValue] = useState([]);
  const clickedBooksTitle = router.query.value;
  console.log(clickedBooksTitle);

  useEffect(() => {
    const fetchClickedBook = async () => {
      const booksValue = await axios(
        `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001&keyword=${clickedBooksTitle}&hits=1`
      );
      setClickedBooksValue(booksValue.data.Items);
    };
    fetchClickedBook();
  }, []);
  console.log(clickedBooksValue);
  return (
    <div className={styles.overall}>
      <div className={styles.linkArea}></div>
      {/*本の詳細と画像*/}
      {clickedBooksValue.map((value: any) => {
        return (
          <div key={null} className={styles.booksBox}>
            <div className={styles.booksImage}>
              <img src={value.Item.largeImageUrl} alt="" />
            </div>
            <div className={styles.booksDetail}>
              <div className={styles.booksContents}>
                <h2>{value.Item.title}</h2>
                <p className={styles.booksAuthor}>{value.Item.author}</p>
                <p className={styles.booksPrice}>￥{value.Item.itemPrice}</p>
              </div>
              <button>
                <ShoppingCartIcon />
                カートに追加する
              </button>
            </div>
          </div>
        );
      })}
      {/*スレッドエリア*/}
      <div className={styles.threadArea}>
        <div className={styles.threadTitle}>
          <div className={styles.titleContents}>
            <div className={styles.iconImage}>
              <img src="./images/icon.png" alt="" />
            </div>
            <h2>みんなのトーク</h2>
          </div>
        </div>
        {/*TODO:トークを送信するには会員登録をする必要がある(disable)*/}
        <div className={styles.inputArea}>
          <input type="text" placeholder="トークを送信しよう！！" />
          <button>トークする</button>
        </div>
        {/*TODO:スレッドがデータベース内にあるかどうかで表示を切り替え*/}
        <div className={styles.unitThread}>
          <div className={styles.userIcon}>
            <div className={styles.usersIconImg}>
              <img src="./images/icon.png" alt="" />
            </div>
          </div>
          <div className={styles.userContents}>
            <div className={styles.userData}>
              <div className={styles.userName}>
                <h2>ブックトーク公式</h2>
                <p>@BOOKTALK_official</p>
              </div>
              <div className={styles.upDateTime}>
                <p>1.5時間前</p>
              </div>
            </div>
            <div className={styles.userText}>今回の呪術おもろ！！</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BooksPage;
