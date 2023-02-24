import { useState, useEffect } from "react";
import styles from "../styles/searchResult.module.scss";
import { useRouter } from "next/router";
import Head  from "next/head";

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
  }, [booksData, inputWord, selectedGenre]);

  return (
    <div className={styles.overall}>
      <Head>
        <title>Book Talk</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="description" content={"あなたの探したい本が見つかるBookTalk"} />
        <meta property="og:url" content={"https://booktalk.vercel.app/pictureBooks"} />
        <meta property="og:title" content={"BookTalk"} />
        <meta property="og:site_name" content={"BookTalk"} />
        <meta property="og:description" content={"あなたの探したい本が見つかるBookTalk"} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={"/images/icon.png"} />
      </Head>
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
  const response = await fetch(
    `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=${genreId}&keyword=${inputWord}&size=1&sort=reviewCount`
  );
  data = await response.json();
  return {
    props: {
      booksData: data.Items,
    },
  };
};
