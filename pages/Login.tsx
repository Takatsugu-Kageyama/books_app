import styles from "../styles/login.module.scss";
import { Formik } from "formik";
import { LoginFormTypes } from "../util/TypeDefinition/FormType";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from "../util/Firebase/firebaseConfig";
import { useRouter } from "next/router";
import { useAuthContext } from "../util/Context/AuthContext";

const Login = () => {
  const auth = getAuth(firebase);
  const router = useRouter();
  return (
    <div className={styles.overall}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <img src="./images/top/logo.png" alt="" />
        </div>
        <h2>ログイン</h2>
        <Formik
          initialValues={{ name: "", password: "" }}
          validate={(values: LoginFormTypes) => {
            const errors: any = {};
            if (!values.name) {
              errors.name = "※お名前を入力してください";
            }
            if (!values.password) {
              errors.password = "※パスワードを入力してください";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
            await signInWithEmailAndPassword(auth, values.name, values.password);
            router.push("/");
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <div className={styles.loginCard}>
              <form onSubmit={handleSubmit}>
                <div className={styles.perInput}>
                  <p>ユーザー名</p>
                  <input
                    className={styles.input}
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    // placeholder=""
                  />
                  <p className={styles.errorText}>{errors.name && touched.name && errors.name}</p>
                </div>
                <div className={styles.perInput}>
                  <p>パスワード</p>
                  <input
                    className={styles.input}
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    // placeholder="BookTalkパスワード"
                  />
                  <p className={styles.errorText}>{errors.password && touched.password && errors.password}</p>
                </div>
                <button className={styles.submitBtn} type="submit" disabled={isSubmitting}>
                  送信
                </button>
              </form>
            </div>
          )}
        </Formik>
        <div className={styles.registerBtn}>
          <p>----- BookTalkを初めて利用ですか？ -----</p>　
          <div className={styles.registerLink}>
            <Link href="/Register">
              <a>アカウント登録はこちらから</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

export const getStaticProps = async () => {
  return {
    props: {
      layout: "user",
    },
  };
};
