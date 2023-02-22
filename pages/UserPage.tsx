import { useEffect, useState } from "react";
import { useAuthContext } from "../util/Context/AuthContext";
import { getUserData } from "../util/Firebase/getUserData";
import { UserSchema } from "../util/TypeDefinition/UserDataSchema";
import styles from "../styles/userPage.module.scss";
import { getAuth, signOut } from "firebase/auth";
import { firebase } from "../util/Firebase/firebaseConfig";
import { useRouter } from "next/router";
import Head from "next/head";

const UserPage = () => {
  //!ユーザーのデータを格納
  const [userData, setUserData] = useState<UserSchema>();
  const auth = getAuth(firebase)
  const router = useRouter()
  //!ユーザーの認証
  const { user } = useAuthContext();
  const isLoggedIn = !!user;

  useEffect(() => {
    if (isLoggedIn) {
      getUserData(user.uid).then((userValue: UserSchema) => {
        setUserData(userValue);
      });
    }
  }, [isLoggedIn, user]);
  return (
    <div className={styles.overall}>
      <Head>
      <title>Book Talk ｜ ユーザーページ</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={"あなたの探したい本が見つかるBookTalk"} />
      <meta property="og:url" content={"https://booktalk.vercel.app/UserPage"} />
      <meta property="og:title" content={'BookTalk'} />
      <meta property="og:site_name" content={'BookTalk'} />
      <meta property="og:description" content={"あなたの探したい本が見つかるBookTalk"} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={"/images/icon.png"} />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
    </Head>
      <div className={styles.userContainer}>
        <h2>{userData ? userData.name : null}さんのアカウント</h2>
        <div className={styles.userCard}>
          <div className={styles.nameBlock}>
            <div className={styles.nameData}>
              <p className={styles.title}>ユーザー名</p>
              <p>{userData ? userData.name : null}</p>
            </div>
          </div>
          <div className={styles.accountBlock}>
            <div className={styles.accountData}>
              <p className={styles.title}>アカウント名</p>
              <p>{userData ? userData.account : null}</p>
            </div>
          </div>
          <div className={styles.emailBlock}>
            <div className={styles.emailData}>
              <p className={styles.title}>メールアドレス</p>
              <p>{userData ? userData.email : null}</p>
            </div>
          </div>
        </div>
        <button onClick={async () => {
           await signOut(auth).then(()=>{
            router.push("/");
           })
        }} className={styles.signOutBtn}>
          サインアウト
        </button>
      </div>
    </div>
  );
};
export default UserPage;
