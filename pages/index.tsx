import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
const Home: NextPage = ({ comicData, lightNovelData, pictureBookData, novelBookData }: any) => {
  //APIを保管するstate
  const [comicPosts, setComicPosts] = useState([]);
  const [lightNovelPosts, setLightNovelPosts] = useState([]);
  const [novelBooksProps, setNovelBooksProps] = useState([]);

  //router初期設定
  const router = useRouter();
  //コンポーネントがマウントされたときにAPIデータを格納
  useEffect(() => {
    setComicPosts(comicData);
    setLightNovelPosts(lightNovelData);
    setNovelBooksProps(novelBookData);
  }, [comicData, lightNovelData, novelBookData, pictureBookData]);
  return (
    <div className={styles.overall}>
      <Head>
        <title>Book Talk ｜ホーム</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="description" content={"あなたの探したい本が見つかるBookTalk"} />
        <meta property="og:url" content={"https://booktalk.vercel.app/"} />
        <meta property="og:title" content={"BookTalk"} />
        <meta property="og:site_name" content={"BookTalk"} />
        <meta property="og:description" content={"あなたの探したい本が見つかるBookTalk"} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={"/images/icon.png"} />
      </Head>
      {/*漫画*/}
      <div className={styles.booksBox}>
        <h2>漫画</h2>
        <div key={null} className={comicPosts !== null ? styles.booksCardArea : styles.cardError}>
          {comicPosts ? (
            comicPosts.map((value: any) => {
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
      {/*ライトノベル*/}
      <div className={styles.booksBox}>
        <h2>ライトノベル</h2>
        <div key={null} className={lightNovelData !== null ? styles.booksCardArea : styles.cardError}>
          {lightNovelPosts ? (
            lightNovelPosts.map((value: any) => {
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
      {/*小説・エッセイ*/}
      <div className={styles.booksBox}>
        <h2>小説・エッセイ</h2>
        <div key={null} className={novelBookData !== null ? styles.booksCardArea : styles.cardError}>
          {novelBooksProps ? (
            novelBooksProps.map((value: any) => {
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
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  let comicData = undefined;
  let lightNovelData = undefined;
  let novelBookData = undefined;

  //!漫画のデータ取得
  const fetchComic = await fetch(
    "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001001&hits=7"
  );
  comicData = await fetchComic.json();

  //!ライトノベルデータの取得
  const fetchLightNovel = await fetch(
    "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001017&hits=7"
  );
  lightNovelData = await fetchLightNovel.json();

  //!小説
  const fetchNovelBook = await fetch(
    "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001004&size=2&hits=7"
  );
  novelBookData = await fetchNovelBook.json();

  return {
    props: {
      comicData: comicData.Items || null,
      lightNovelData: lightNovelData.Items || null,
      novelBookData: novelBookData.Items || null,
    },
  };
};
