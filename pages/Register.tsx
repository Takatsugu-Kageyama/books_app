import styles from "../styles/register.module.scss";
import { Formik } from "formik";
import { firebase } from "../util/Firebase/firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { sendUserData } from "../util/Firebase/sendUserData";
import { useRouter } from "next/router";
import Head from "next/head";

const Register = () => {
  const auth = getAuth(firebase);
  const router = useRouter()
  return (
    <div className={styles.overall}>
      <Head>
      <title>Book Talk ｜ 登録ページ</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={"あなたの探したい本が見つかるBookTalk"} />
      <meta property="og:url" content={"https://booktalk.vercel.app/Register"} />
      <meta property="og:title" content={'BookTalk'} />
      <meta property="og:site_name" content={'BookTalk'} />
      <meta property="og:description" content={"あなたの探したい本が見つかるBookTalk"} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={"/images/icon.png"} />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
    </Head>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <img src="./images/top/logo.png" alt="" />
        </div>
        <h2>登録フォーム</h2>
        <Formik
          initialValues={{ name: "", account: "", email: "", password: "" }}
          validate={(values) => {
            const errors: any = {};
            //!名前のバリデーション
            if (!values.name) {
              errors.name = "※お名前の入力は必須です。";
            }
            //!アカウントのバディエーション
            if (!values.account) {
              errors.account = "※アカウントの入力は必須です";
            } else if (!/^[a-zA-Z0-9]+$/) {
              errors.account = "※アカウントは半角英字で入力してください。";
            } else if (values.account.length <= 3 && 20 >= values.account.length) {
              errors.account = "※アカウントは3文字以上20文字以下で入力してください。";
            }
            //!メールアドレスのバディエーション
            if (!values.email) {
              errors.email = "※メールアドレスの入力は必須です。";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = "※無効なメールアドレスです。";
            }
            //!パスワードのバリデーション
            if (!values.password) {
              errors.password = "※パスワードの入力は必須です。";
            } else if (values.password.length <= 10 && 30 <= values.password.length) {
              errors.password = "※パスワードは10文字以上30字以下で入力してください。";
            }
            return errors;
          }}
          onSubmit={async (values) => {
            await createUserWithEmailAndPassword(auth, values.email, values.password).then((cred) => {
              sendUserData(cred.user.uid, values.name, values.account, values.email, values.password).then(()=>{
                router.push("/");
              });
            });
           
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
            <div className={styles.formCard}>
              <form onSubmit={handleSubmit}>
                <div className={styles.perForm}>
                  <p>お名前</p>
                  <input className={styles.input} type="text" name="name" onChange={handleChange} value={values.name} />
                  <p className={styles.errorText}>{errors.name && touched.name && errors.name}</p>
                </div>
                <div className={styles.perForm}>
                  <p>アカウント名</p>
                  <input
                    className={styles.input}
                    type="text"
                    name="account"
                    onChange={handleChange}
                    value={values.account}
                    pattern="^[0-9a-zA-Z]+$"
                  />
                  <p className={styles.errorText}>{errors.account && touched.account && errors.account}</p>
                </div>
                <div className={styles.perForm}>
                  <p>メールアドレス</p>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                  <p className={styles.errorText}>{errors.email && touched.email && errors.email}</p>
                </div>
                <div className={styles.perForm}>
                  <p>パスワード</p>
                  <input
                    className={styles.input}
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
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
      </div>
    </div>
  );
};
export default Register;
export const getStaticProps = async () => {
  return {
    props: {
      layout: "user",
    },
  };
};
