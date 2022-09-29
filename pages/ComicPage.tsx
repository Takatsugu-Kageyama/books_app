import styles from "../styles/genrePage.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ComicPage = ({ newComicData, popularComicData, evaluationComicData }: any) => {
  const [comicNewPosts, setComicNewPosts] = useState([]);
  const [comicEarningsPosts, setComicEarningsPosts] = useState([]);
  const [comicEvaluationPosts, setComicEvaluationPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setComicNewPosts(newComicData);
    setComicEarningsPosts(popularComicData);
    setComicEvaluationPosts(evaluationComicData);
  }, []);
  return (
    <div className={styles.overall}>
      <h2 className={styles.header}>漫画</h2>
      {/*新着*/}
      <div className={styles.booksBox}>
        <h2>新着漫画</h2>
        <div className={styles.booksCardArea}>
          {comicNewPosts.map((value: any) => {
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
          })}
        </div>
      </div>
      {/*人気作品*/}
      <div className={styles.booksBox}>
        <h2>人気作品</h2>
        <div className={styles.booksCardArea}>
          {comicEarningsPosts.map((value: any) => {
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
          })}
        </div>
      </div>
      {/*高評価の多い作品*/}
      <div className={styles.booksBox}>
        <h2>高評価の多い作品</h2>
        <div className={styles.booksCardArea}>
          {comicEvaluationPosts.map((value: any) => {
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
          })}
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
  let newComicData = undefined;
  let popularComicData = undefined;
  let evaluationComicData = undefined;
  while (!newComicData && !popularComicData && !evaluationComicData) {
    await sleepByPromise(0.2);
    //!新着漫画の取得
    const fetchNewComic = await fetch(
      "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001001&sort=-releaseDate&hits=7"
    );
    newComicData = await fetchNewComic.json();
    await sleepByPromise(0.2);
    //!人気作品の取得
    const fetchPopularComic = await fetch(
      "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001001&sort=sales&hits=7"
    );
    popularComicData = await fetchPopularComic.json();
    await sleepByPromise(0.2);
    //!高評価の多い作品
    const fetchEvaluationComic = await fetch(
      "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001001&sort=reviewAverage&hits=7"
    );
    evaluationComicData = await fetchEvaluationComic.json();
  }
  return {
    props: {
      newComicData: newComicData.Items,
      popularComicData: popularComicData.Items,
      evaluationComicData: evaluationComicData.Items,
    },
  };
};
