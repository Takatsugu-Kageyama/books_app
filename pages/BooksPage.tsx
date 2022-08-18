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
      {clickedBooksValue.map((value: any) => {
        return (
          <div className={styles.booksBox}>
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
    </div>
  );
};
export default BooksPage;
