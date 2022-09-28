import { useEffect } from "react";
import { useAuthContext } from "../util/Context/AuthContext";
import styles from "../styles/userPage.module.scss";

const UserPage = () => {
  const { user } = useAuthContext();
  const isLoggedIn = !!user;
  return (
    <div className={styles.overall}>
      <div className={styles.userDetail}>
        <h2></h2>
      </div>
    </div>
  );
};
export default UserPage;
