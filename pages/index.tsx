import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { fetchComicData, fetchPictureBookData, fetchStudyBookData } from "../util/API/RakutenBooks";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  //APIを保管するstate
  const [posts, setPosts] = useState([]);
  const [comicPosts, setComicPosts] = useState([]);
  const [pictureBooksPosts, setPictureBooksPosts] = useState([]);

  // const [contemporaryBooksPosts, setContemporaryBooksPosts] = useState([]);
  // const [lightBooksPosts, setLightBooksPosts] = useState([]);

  //router初期設定
  const router = useRouter();

  useEffect(() => {
    fetchComicData().then((value) => {
      setComicPosts(value.data.Items);
    });
    fetchStudyBookData().then((value) => {
      setPosts(value.data.Items);
    });
    fetchPictureBookData().then((value) => {
      setPictureBooksPosts(value.data.Items);
    });
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
      {/*語学・学習参考書*/}
      <div className={styles.booksBox}>
        <h2>漫画</h2>
        <div key={null} className={styles.booksCardArea}>
          {posts.map((value: any) => {
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
              </div>
            );
          })}
        </div>
      </div>
      {/*絵本・児童書*/}
      <div className={styles.booksBox}>
        <h2>絵本・児童書</h2>
        <div key={null} className={styles.booksCardArea}>
          {pictureBooksPosts.map((value: any) => {
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
              </div>
            );
          })}
        </div>
      </div>
      {/*/!*新書*!/*/}
      {/*<div className={styles.booksBox}>*/}
      {/*  <h2>新書</h2>*/}
      {/*  <div className={styles.booksCardArea}>*/}
      {/*    {contemporaryBooksPosts.map((value) => {*/}
      {/*      return (*/}
      {/*        <div className={styles.booksCard}>*/}
      {/*          <div className={styles.booksImg}>*/}
      {/*            <img src={value.Item.largeImageUrl} alt="" />*/}
      {/*          </div>*/}
      {/*          <h2 className={styles.booksTitle} id="booksTitle">*/}
      {/*            {value.Item.title.length > 20*/}
      {/*              ? value.Item.title.substr(0, 33) + "..."*/}
      {/*              : value.Item.title}*/}
      {/*          </h2>*/}
      {/*          <p className={styles.booksAuthor}>{value.Item.author}</p>*/}
      {/*          <p className={styles.booksPrice}>￥{value.Item.itemPrice}</p>*/}
      {/*        </div>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*/!*ライトノベル*!/*/}
      {/*<div className={styles.booksBox}>*/}
      {/*  <h2>ライトノベル</h2>*/}
      {/*  <div className={styles.booksCardArea}>*/}
      {/*    {lightBooksPosts.map((value) => {*/}
      {/*      return (*/}
      {/*        <div className={styles.booksCard}>*/}
      {/*          <div className={styles.booksImg}>*/}
      {/*            <img src={value.Item.largeImageUrl} alt="" />*/}
      {/*          </div>*/}
      {/*          <h2 className={styles.booksTitle} id="booksTitle">*/}
      {/*            {value.Item.title.length > 20*/}
      {/*              ? value.Item.title.substr(0, 33) + "..."*/}
      {/*              : value.Item.title}*/}
      {/*          </h2>*/}
      {/*          <p className={styles.booksAuthor}>{value.Item.author}</p>*/}
      {/*          <p className={styles.booksPrice}>￥{value.Item.itemPrice}</p>*/}
      {/*        </div>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*/!*美容・暮らし・健康・料理*!/*/}
      {/*<div className={styles.booksBox}>*/}
      {/*  <h2>美容・暮らし・健康・料理</h2>*/}
      {/*  <div className={styles.booksCardArea}>*/}
      {/*    {posts.map((value) => {*/}
      {/*      return (*/}
      {/*        <div className={styles.booksCard}>*/}
      {/*          <div className={styles.booksImg}>*/}
      {/*            <img src={value.Item.largeImageUrl} alt="" />*/}
      {/*          </div>*/}
      {/*          <h2 className={styles.booksTitle} id="booksTitle">*/}
      {/*            {value.Item.title.length > 20*/}
      {/*              ? value.Item.title.substr(0, 33) + "..."*/}
      {/*              : value.Item.title}*/}
      {/*          </h2>*/}
      {/*          <p className={styles.booksAuthor}>{value.Item.author}</p>*/}
      {/*          <p className={styles.booksPrice}>￥{value.Item.itemPrice}</p>*/}
      {/*        </div>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default Home;
