import Layout from "../components/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../util/Context/AuthContext";
import useTransition from "../components/useTransition";

function MyApp({ Component, pageProps }: AppProps) {
  useTransition();
  switch (pageProps.layout) {
    case "user":{
      return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
      );
    }
    default:{
      return (
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      );
    }
  }
}

export default MyApp;
