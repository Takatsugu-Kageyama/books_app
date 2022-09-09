import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "../styles/components/layout.module.css";
import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const Layout = ({ children }: LayoutProps) => {
  //!ユーザーが検索欄に入力した値を保管
  const [inputValue, setInputValue] = useState("");
  //!変換の状態
  const [isComposing, setIsComposing] = useState(false);
  const router = useRouter(); //!Next Router

  //ユーザーアクション
  const keyPress = (e: any) => {
    if (e.key === "Enter" && isComposing && inputValue) {
      console.log("入力中にエンターが押されました");
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
  // console.log(inputValue);
  return (
    <div className={styles.layoutWrap}>
      <div className={styles.contentsWrap}>
        <Navbar />
        <div className={styles.rightSideWrap}>
          {/*検索欄とロゴ*/}
          <div className={styles.topContainer}>
            <div className={styles.inputArea}>
              <input
                onInput={isSearchBarChanged}
                onKeyPress={(e) => keyPress(e)}
                placeholder="本のタイトルを検索"
                onCompositionStart={(e) => {
                  setIsComposing(false);
                }}
                onCompositionEnd={(e) => {
                  setIsComposing(true);
                }}
              />
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
