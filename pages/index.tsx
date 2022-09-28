import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Home: NextPage = ({ comicData, lightNovelData, pictureBookData, novelBookData }: any) => {
  //APIを保管するstate
  const [comicPosts, setComicPosts] = useState([]);
  const [lightNovelPosts, setLightNovelPosts] = useState([]);
  const [pictureBooksPosts, setPictureBooksPosts] = useState([]);
  const [novelBooksProps, setNovelBooksProps] = useState([]);

  //router初期設定
  const router = useRouter();
  //コンポーネントがマウントされたときにAPIデータを格納
  useEffect(() => {
    setComicPosts(comicData);
    setLightNovelPosts(lightNovelData);
    setPictureBooksPosts(pictureBookData);
    setNovelBooksProps(novelBookData);
  }, []);
  return (
    <div className={styles.overall}>
      {/*漫画*/}
      <div className={styles.booksBox}>
        <h2>漫画</h2>
        <div key={null} className={styles.booksCardArea}>
          {comicPosts.map((value: any) => {
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
      {/*ライトノベル*/}
      <div className={styles.booksBox}>
        <h2>ライトノベル</h2>
        <div key={null} className={styles.booksCardArea}>
          {lightNovelPosts.map((value: any) => {
            return (
              <div key={null} className={styles.booksCard}>
                <div className={styles.cardsContent}>
                  <div
                    className={styles.booksImg}
                    onClick={() => {
                      // setClickedBook(value);
                      // console.log(clickedBook);
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
      {/*小説・エッセイ*/}
      <div className={styles.booksBox}>
        <h2>小説・エッセイ</h2>
        <div key={null} className={styles.booksCardArea}>
          {novelBooksProps.map((value: any) => {
            return (
              <div key={null} className={styles.booksCard}>
                <div className={styles.cardsContent}>
                  <div
                    className={styles.booksImg}
                    onClick={() => {
                      // setClickedBook(value);
                      // console.log(clickedBook);
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
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  function sleepByPromise(sec: number) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
  }
  let comicData = undefined;
  let lightNovelData = undefined;
  let novelBookData = undefined;

  while (!comicData && !lightNovelData && !novelBookData) {
    await sleepByPromise(0.3);
    //!漫画のデータ取得
    const fetchComic = await fetch(
      "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001001&hits=6"
    );
    comicData = await fetchComic.json();
    await sleepByPromise(0.3);
    //!ライトノベルデータの取得
    const fetchLightNovel = await fetch(
      "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001017&hits=6"
    );
    lightNovelData = await fetchLightNovel.json();
    await sleepByPromise(0.3);
    //!小説
    const fetchNovelBook = await fetch(
      "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001004&size=2&hits=6"
    );
    novelBookData = await fetchNovelBook.json();
  }
  return {
    props: {
      comicData: comicData.Items,
      lightNovelData: lightNovelData.Items,
      novelBookData: novelBookData.Items,
    },
  };
};
