import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  /*
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      fetch(
        "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&keyword=%E6%9C%AC&booksGenreId=000&applicationId=e06e2a5afcf14b52139c1fb6c58e9dbc",
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => setPosts(data));
    }, []);
    console.log(posts);
     */
  return (
    <div className={styles.overall}>
      {/*あなたへのおすすめ*/}
      <div className={styles.booksBox}>
        <h2>あなたへのおすすめ</h2>
      </div>
      {/*漫画*/}
      <div className={styles.booksBox}>
        <h2>漫画</h2>
      </div>
      {/*語学・学習参考書*/}
      <div className={styles.booksBox}>
        <h2>語学・学習参考書</h2>
      </div>
      {/*絵本・児童書*/}
      <div className={styles.booksBox}>
        <h2>絵本・児童書</h2>
      </div>
      {/*新書*/}
      <div className={styles.booksBox}>
        <h2>新書</h2>
      </div>
      {/*ライトノベル*/}
      <div className={styles.booksBox}>
        <h2>ライトノベル</h2>
      </div>
      {/*美容・暮らし・健康・料理*/}
      <div className={styles.booksBox}>
        <h2>美容・暮らし・健康・料理</h2>
      </div>
    </div>
  );
};

export default Home;
