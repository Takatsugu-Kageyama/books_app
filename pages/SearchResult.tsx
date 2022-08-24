import { useState, useEffect } from "react";
import styles from "../styles/searchResult.module.scss";
import { useRouter } from "next/router";
import axios from "axios";

const SearchResult = () => {
  //ステートの設定
  const [resultBooks, setResultBooks] = useState([]); //!検索結果を格納
  //変数
  const router = useRouter(); //!Next Router
  const inputWord = router.query.value;

  //!Side Effect
  useEffect(() => {
    const fetchResultBook = async () => {
      const booksValue = await axios(
        `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001&keyword=${inputWord}&size=1&sort=reviewCount`
      );
      setResultBooks(booksValue.data.Items);
    };
    fetchResultBook();
  }, []);
  console.log(resultBooks);
  return (
    <div className={styles.overall}>
      <div className={styles.booksArea}>
        {resultBooks.map((value: any) => {
          return (
            <div key={null} className={styles.booksCard}>
              <div
                className={styles.booksImg}
                onClick={() => {
                  router.push({
                    pathname: "BooksPage",
                    query: { value: value.Item.title },
                  });
                }}
              >
                <img src={value.Item.largeImageUrl} alt="" />
              </div>
              <h2 className={styles.booksTitle} id="booksTitle">
                {value.Item.title.length > 20 ? value.Item.title.substr(0, 33) + "..." : value.Item.title}
              </h2>
              <p className={styles.booksAuthor}>{value.Item.author}</p>
              <p className={styles.booksPrice}>￥{value.Item.itemPrice}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SearchResult;
