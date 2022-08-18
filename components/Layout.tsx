import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "../styles/components/layout.module.css";
import { ReactElement } from "react";
import Head from "next/head";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layoutWrap}>
      {/*    <Head>*/}
      {/*      <script*/}
      {/*        dangerouslySetInnerHTML={{*/}
      {/*          __html: `*/}
      {/*(function(d) {*/}
      {/*  var config = {*/}
      {/*    kitId: 'mam1vti',*/}
      {/*    scriptTimeout: 3000,*/}
      {/*    async: true*/}
      {/*  },*/}
      {/*  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)*/}
      {/*})(document);*/}
      {/*`,*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </Head>*/}
      <div className={styles.contentsWrap}>
        <Navbar />
        <div className={styles.rightSideWrap}>
          {/*検索欄とロゴ*/}
          <div className={styles.topContainer}>
            <div className={styles.inputArea}>
              <input placeholder="本のタイトルを検索" />
              <button>検索</button>
            </div>
            <div className={styles.indArea}>
              <div className={styles.cartBtn}>
                <ShoppingCartIcon />
                <p>カート</p>
              </div>
              <div className={styles.accountBtn}>
                <AccountCircleIcon className={styles.accountIcon} />
              </div>
            </div>
          </div>
          <main className={styles.main}>{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
