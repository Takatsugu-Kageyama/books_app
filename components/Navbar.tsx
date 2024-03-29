import styles from "../styles/components/navbar.module.css";
import Link from "next/link";

type LayoutPropsSchema = {
  isMenuOpen: boolean;
};
export default function Navbar({ isMenuOpen }: LayoutPropsSchema) {
  return (
    <div>
      <div className={isMenuOpen ? styles.openOverall : styles.overall}>
        {/*ジャンルナビゲーションバー*/}
        <div className={styles.nav}>
          <Link href="/">
            <div className={styles.logo}>
              <img src="./images/top/logo.png" alt="" />
            </div>
          </Link>
          <ul>
            <li className=" font-MaruGothic">
              <Link href="/ComicPage">漫画</Link>
            </li>
            <li className=" font-MaruGothic">
              <Link href="/studyBooks">語学・学習参考書</Link>
            </li>
            <li className=" font-MaruGothic">
              <Link href="/pictureBooks">絵本・児童書</Link>
            </li>
            <li className=" font-MaruGothic">
              <Link href="/novelBooks">小説・エッセイ</Link>
            </li>
            <li className=" font-MaruGothic">
              <Link href="/newBooks">新書</Link>
            </li>
            <li className=" font-MaruGothic">
              <Link href="/lightNovel">ライトノベル</Link>
            </li>
            <li className=" font-MaruGothic">
              <Link href="/beautyBooks">美容・暮らし・健康・料理</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
