import styles from "../styles/genrePage.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const ComicPage = ({ newBooksData, popularBooksData, evaluationBooksData }: any) => {
  const [booksNewPosts, setBooksNewPosts] = useState([]);
  const [booksEarningsPosts, setBooksEarningsPosts] = useState([]);
  const [booksEvaluationPosts, setBooksEvaluationPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setBooksNewPosts(newBooksData);
    setBooksEarningsPosts(popularBooksData);
    setBooksEvaluationPosts(evaluationBooksData);
  }, [evaluationBooksData, newBooksData, popularBooksData]);
  return (
    <div className={styles.overall}>
      <Head>
        <title>Book Talk ｜ 語学・参考書</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="description" content={"あなたの探したい本が見つかるBookTalk"} />
        <meta property="og:url" content={"https://booktalk.vercel.app/studyBooks"} />
        <meta property="og:title" content={"BookTalk"} />
        <meta property="og:site_name" content={"BookTalk"} />
        <meta property="og:description" content={"あなたの探したい本が見つかるBookTalk"} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={"/images/icon.png"} />
      </Head>
      <h2 className={styles.header}>語学・参考書</h2>
      {/*新着*/}
      <div className={styles.booksBox}>
        <h2>新着</h2>
        <div className={booksNewPosts !== null ? styles.booksCardArea : styles.cardError}>
          {booksNewPosts ? (
            booksNewPosts.map((value: any) => {
              return (
                <div key={null} className={styles.booksCard}>
                  <div className={styles.cardsContent}>
                    <div
                      className={styles.booksImg}
                      onClick={() => {
                        router.push({
                          pathname: "BooksPage",
                          query: { value: value.Item.isbn },
                        });
                        // isBooksChats(value.Item.isbn);
                      }}
                    >
                      <img src={value.Item.largeImageUrl} alt="" />
                    </div>
                    <h2 className={styles.booksTitle} id="booksTitle">
                      {value.Item.title.length > 20 ? value.Item.title.substr(0, 18) + "..." : value.Item.title}
                    </h2>
                    <p className={styles.booksAuthor}>{value.Item.author}</p>
                    <p className={styles.booksPrice}>￥{value.Item.itemPrice}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className={styles.error}>
              読み込み中にエラーが発生しました。申し訳ございませんが再度リロードしお試しください
            </p>
          )}
        </div>
      </div>
      {/*人気作品*/}
      <div className={styles.booksBox}>
        <h2>人気作品</h2>
        <div className={booksEarningsPosts !== null ? styles.booksCardArea : styles.cardError}>
          {booksEarningsPosts ? (
            booksEarningsPosts.map((value: any) => {
              return (
                <div key={null} className={styles.booksCard}>
                  <div className={styles.cardsContent}>
                    <div
                      className={styles.booksImg}
                      onClick={() => {
                        router.push({
                          pathname: "BooksPage",
                          query: { value: value.Item.isbn },
                        });
                        // isBooksChats(value.Item.isbn);
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
            })
          ) : (
            <p className={styles.error}>
              読み込み中にエラーが発生しました。申し訳ございませんが再度リロードしお試しください
            </p>
          )}
        </div>
      </div>
      {/*高評価の多い作品*/}
      <div className={styles.booksBox}>
        <h2>高評価の多い作品</h2>
        <div className={booksEarningsPosts !== null ? styles.booksCardArea : styles.cardError}>
          {booksEvaluationPosts ? (
            booksEvaluationPosts.map((value: any) => {
              return (
                <div key={null} className={styles.booksCard}>
                  <div className={styles.cardsContent}>
                    <div
                      className={styles.booksImg}
                      onClick={() => {
                        router.push({
                          pathname: "BooksPage",
                          query: { value: value.Item.isbn },
                        });
                        // isBooksChats(value.Item.isbn);
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
            })
          ) : (
            <p className={styles.error}>
              読み込み中にエラーが発生しました。申し訳ございませんが再度リロードしお試しください
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ComicPage;

export const getServerSideProps = async () => {
  function sleepByPromise(sec: number) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
  }
  let newBooksData = undefined;
  let popularBooksData = undefined;
  let evaluationBooksData = undefined;

  //!新着漫画の取得
  const fetchNewComic = await fetch(
    "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001002&sort=-releaseDate&hits=7"
  );
  newBooksData = await fetchNewComic.json();

  //!人気作品の取得
  const fetchPopularComic = await fetch(
    "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001002&sort=sales&hits=7"
  );
  popularBooksData = await fetchPopularComic.json();

  //!高評価の多い作品
  const fetchEvaluationComic = await fetch(
    "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001002&sort=reviewAverage&hits=7"
  );
  evaluationBooksData = await fetchEvaluationComic.json();

  return {
    props: {
      newBooksData: newBooksData.Items || null,
      popularBooksData: popularBooksData.Items || null,
      evaluationBooksData: evaluationBooksData.Items || null,
    },
  };
};
