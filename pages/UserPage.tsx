import { useEffect, useState } from "react";
import { useAuthContext } from "../util/Context/AuthContext";
import { getUserData } from "../util/Firebase/getUserData";
import { UserSchema } from "../util/TypeDefinition/UserDataSchema";
import styles from "../styles/userPage.module.scss";
import { getAuth, signOut } from "firebase/auth";
import { firebase } from "../util/Firebase/firebaseConfig";
import { useRouter } from "next/router";

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
  }, [user]);
  return (
    <div className={styles.overall}>
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
