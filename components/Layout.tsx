import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "../styles/components/layout.module.css";
import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthContext } from "../util/Context/AuthContext";
import {genreIdObj} from '../util/Context/GenreObj'

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const Layout = ({ children }: LayoutProps) => {
  //!ユーザーが検索欄に入力した値を保管
  const [inputValue, setInputValue] = useState("");
  //!変換の状態
  const [isComposing, setIsComposing] = useState(false);
  //!ハンバーガーメニューがクリックされているかの状態を保管
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //!セレクトされたジャンルを保管
  const [isGenre, setIsGenre] = useState("");
  const router = useRouter(); //!Next Router
  //!ユーザーがログインしているかの確認
  const { user } = useAuthContext();
  const isLoggedIn = !!user;
  const genreId = genreIdObj;
  //!ユーザーアクション
  const keyPress = (e: any) => {
    if (e.key === "Enter" && isComposing && inputValue !== "") {
      router.push({
        pathname: "SearchResult",
        query: { value: inputValue },
      });
    }
  };
  //!検索欄に入力された内容を保存
  const isSearchBarChanged = (e: any) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      setIsMenuOpen(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  console.log(isMenuOpen);
  return (
    <div className={styles.layoutWrap}>
      <div className={styles.contentsWrap}>
        <Navbar isMenuOpen={isMenuOpen} />
        <div className={styles.rightSideWrap}>
          {/*検索欄とロゴ*/}
          <div className={styles.topContainer}>
            {/* ハンバーガーメニュー */}
            <button
              onClick={(e) => {
                e.preventDefault;
                setIsMenuOpen(!isMenuOpen);
              }}
              className={isMenuOpen ? styles.openHamburger : styles.hamburger}
            >
              <span className={isMenuOpen ? styles.isActive : styles.hamburgerBar}></span>
              <span className={isMenuOpen ? styles.isActive : styles.hamburgerBar}></span>
              <span className={isMenuOpen ? styles.isActive : styles.hamburgerBar}></span>
            </button>
            <div className={styles.inputArea}>
              <select value={isGenre} className={styles.genreSelect} onChange={(e) => setIsGenre(e.target.value)}>
                <option value="all">すべて</option>
                <option value="comic">漫画</option>
                <option value="study">語学・参考書</option>
                <option value="picture">絵本・児童書</option>
                <option value="novel">小説・エッセイ</option>
                <option value="pc">パソコン・システム開発</option>
                <option value="business">ビジネス・経済・就職</option>
                <option value="travel">旅行・留学・アウトドア</option>
                <option value="social">文・思想・社会</option>
                <option value="health">美容・暮らし・健康・料理</option>
                <option value="entertainment">エンタメ・ゲーム</option>
                <option value="science">科学・技術</option>
                <option value="photography">写真集・タレント</option>
                <option value="lightNovel">ライトノベル</option>
                <option value="paperback"> 文庫</option>
                <option value="newNovel"> 新書</option>
              </select>
              <input
                onInput={isSearchBarChanged}
                onKeyPress={(e) => keyPress(e)}
                placeholder="本のタイトルを検索"
                onCompositionStart={() => {
                  setIsComposing(false);
                }}
                onCompositionEnd={() => {
                  setIsComposing(true);
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault;
                  console.log()
                  if (inputValue !== "") {
                    router.push({
                      pathname: "SearchResult",
                      query: { value: inputValue },
                    });
                  }
                }}
              >
                検索
              </button>
            </div>
            <div className={styles.indArea}>
              <Link href={isLoggedIn ? "/Cart" : "/Login"}>
                <div className={styles.cartBtn}>
                  <ShoppingCartIcon className={styles.cartIcon} />
                  <p>カート</p>
                </div>
              </Link>
              <div className={styles.accountBtn}>
                <Link href={isLoggedIn ? "/UserPage" : "/Login"}>
                  <AccountCircleIcon className={styles.accountIcon} />
                </Link>
              </div>
            </div>
          </div>
          <main className={styles.main}>{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
