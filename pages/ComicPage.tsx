import styles from "../styles/genrePage.module.scss";
import { useEffect, useState } from "react";
import {
  fetchComicEarningsSortData,
  fetchComicNewSortData,
  fetchEvaluationSortData,
} from "../util/API/RakutenBooks";
import { useRouter } from "next/router";

const ComicPage = () => {
  const [comicNewPosts, setComicNewPosts] = useState([]);
  const [comicEarningsPosts, setComicEarningsPosts] = useState([]);
  const [comicEvaluationPosts, setComicEvaluationPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetchComicNewSortData().then((value) => {
      setComicNewPosts(value.data.Items);
    });
    fetchComicEarningsSortData().then((value) => {
      setComicEarningsPosts(value.data.Items);
    });
    fetchEvaluationSortData().then((value) => {
      setComicEvaluationPosts(value.data.Items);
    });
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
              <div className={styles.booksCard}>
                <div
                  className={styles.booksImg}
                  onClick={() => {
                    // setClickedBook(value);
                    // console.log(clickedBook);
                    router.push({
                      pathname: "BooksPage",
                      query: { value: value.Item.title },
                    });
                  }}
                >
                  <img src={value.Item.largeImageUrl} alt="" />
                </div>
                <h2 className={styles.booksTitle} id="booksTitle">
                  {value.Item.title.length > 20
                    ? value.Item.title.substr(0, 33) + "..."
                    : value.Item.title}
                </h2>
                <p className={styles.booksAuthor}>{value.Item.author}</p>
                <p className={styles.booksPrice}>￥{value.Item.itemPrice}</p>
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
              <div className={styles.booksCard}>
                <div
                  className={styles.booksImg}
                  onClick={() => {
                    // setClickedBook(value);
                    // console.log(clickedBook);
                    router.push({
                      pathname: "BooksPage",
                      query: { value: value.Item.title },
                    });
                  }}
                >
                  <img src={value.Item.largeImageUrl} alt="" />
                </div>
                <h2 className={styles.booksTitle} id="booksTitle">
                  {value.Item.title.length > 20
                    ? value.Item.title.substr(0, 33) + "..."
                    : value.Item.title}
                </h2>
                <p className={styles.booksAuthor}>{value.Item.author}</p>
                <p className={styles.booksPrice}>￥{value.Item.itemPrice}</p>
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
              <div className={styles.booksCard}>
                <div
                  className={styles.booksImg}
                  onClick={() => {
                    // setClickedBook(value);
                    // console.log(clickedBook);
                    router.push({
                      pathname: "BooksPage",
                      query: { value: value.Item.title },
                    });
                  }}
                >
                  <img src={value.Item.largeImageUrl} alt="" />
                </div>
                <h2 className={styles.booksTitle} id="booksTitle">
                  {value.Item.title.length > 20
                    ? value.Item.title.substr(0, 33) + "..."
                    : value.Item.title}
                </h2>
                <p className={styles.booksAuthor}>{value.Item.author}</p>
                <p className={styles.booksPrice}>￥{value.Item.itemPrice}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ComicPage;
