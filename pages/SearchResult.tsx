import { useState, useEffect } from "react";
import styles from "../styles/searchResult.module.scss";
import { useRouter } from "next/router";

const SearchResult = ({ booksData }: any) => {
  //ステートの設定
  const [resultBooks, setResultBooks] = useState([]); //!検索結果を格納

  //変数
  const router = useRouter(); //!Next Router
  const inputWord = router.query.value;
  const selectedGenre = router.query.genre;
  //Side Effect
  //!入力値が変更された時に再度API接続をしてデータを取得
  useEffect(() => {
    setResultBooks(booksData);
  }, [inputWord, selectedGenre]);

  return (
    <div className={styles.overall}>
      <div className={styles.booksArea}>
        {resultBooks.map((value: any) => {
          return (
            <div key={null} className={styles.booksCard}>
              <div className={styles.cardsContents}>
                <div
                  className={styles.booksImg}
                  onClick={() => {
                    router.push({
                      pathname: "BooksPage",
                      query: { value: value.Item.isbn },
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SearchResult;

export const getServerSideProps = async (context: any) => {
  const { query } = context;
  const inputWord = query.value;
  const genreId = query.genre;
  let data = null;
  function sleepByPromise(sec: any) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
  }
  while (!data) {
    await sleepByPromise(0.3);
    const response = await fetch(
      `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=${genreId}&keyword=${inputWord}&size=1&sort=reviewCount`
    );
    data = await response.json();
    // console.log(data.Items);
    if (data) {
      return {
        props: {
          booksData: data.Items,
        },
      };
    }
  }
};
