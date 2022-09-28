import { useEffect } from "react";
import { useAuthContext } from "../util/Context/AuthContext";
import styles from "../styles/userPage.module.scss";

const UserPage = () => {
  const { user } = useAuthContext();
  const isLoggedIn = !!user;
  console.log(isLoggedIn);
  useEffect(()=>{
    if (isLoggedIn) {
      console.log('ログインしてます');
    }else{
      console.log('ログインしてません')
    }
  })
  return (
    <div className={styles.overall}>
      <div className={styles.userDetail}>
        <h2></h2>
      </div>
    </div>
  );
};
export default UserPage;
