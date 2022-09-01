import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "../styles/components/layout.module.css";
import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const Layout = ({ children }: LayoutProps) => {
  //Stateの設定
  const [inputValue, setInputValue] = useState(""); //!ユーザーが検索欄に入力した値を保管

  //変数の設定
  const router = useRouter(); //!Next Router

  //ユーザーアクション
  //!検索欄に入力された内容を保存
  const isSearchBarChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  // console.log(inputValue);
  return (
    <div className={styles.layoutWrap}>
      <div className={styles.contentsWrap}>
        <Navbar />
        <div className={styles.rightSideWrap}>
          {/*検索欄とロゴ*/}
          <div className={styles.topContainer}>
            <div className={styles.inputArea}>
              <input onInput={isSearchBarChanged} placeholder="本のタイトルを検索" />
              <button
                onClick={(e) => {
                  e.preventDefault;
                  router.push({
                    pathname: "SearchResult",
                    query: { value: inputValue },
                  });
                }}
              >
                検索
              </button>
            </div>
            <div className={styles.indArea}>
              <Link href="/Cart">
                <div className={styles.cartBtn}>
                  <ShoppingCartIcon />
                  <p>カート</p>
                </div>
              </Link>
              <div className={styles.accountBtn}>
                <AccountCircleIcon className={styles.accountIcon} />
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
