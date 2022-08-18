import styles from "../styles/components/navbar.module.css";
//Material Icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className={styles.overall}>
      {/*ジャンルナビゲーションバー*/}
      <div className={styles.nav}>
        <Link href="/">
          <div className={styles.logo}>
            <img src="./images/top/logo.png" alt="" />
          </div>
        </Link>
        <ul>
          <li>
            <Link href="/ComicPage">漫画</Link>
          </li>
          <li>
            <Link href="/">語学・学習参考書</Link>
          </li>
          <li>
            <Link href="/">絵本・児童書</Link>
          </li>
          <li>
            <Link href="/">小説・エッセイ</Link>
          </li>
          <li>
            <Link href="/">新書</Link>
          </li>
          <li>
            <Link href="/">ライトノベル</Link>
          </li>
          <li>
            <Link href="/">美容・暮らし・健康・料理</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
