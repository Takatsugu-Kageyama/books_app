import styles from "../styles/login.module.scss";
import { Formik } from "formik";
import { LoginFormTypes } from "../util/TypeDefinition/FormType";

const Login = () => {
  return (
    <div className={styles.overall}>
      <div className={styles.formContainer}>
        <h2>ログイン</h2>
        <Formik
          initialValues={{ name: "", password: "" }}
          validate={(values: LoginFormTypes) => {
            const errors: any = {};
            if (!values.name) {
              errors.name = "お名前を入力してください";
            }
            if (!values.password) {
              errors.password = "パスワードを入力してください";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
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
                  {errors.name && touched.name && errors.name}
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
                  {errors.password && touched.password && errors.password}
                </div>
                <button type="submit" disabled={isSubmitting}>
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
export default Login;

export const getStaticProps = async () => {
  return {
    props: {
      layout: "user",
    },
  };
};
