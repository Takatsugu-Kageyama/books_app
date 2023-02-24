//スタイル
import styles from "../styles/booksPage.module.scss";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import { isBooksChats } from "../util/Firebase/booksChatAuth";
import { sentBooksChat } from "../util/Firebase/sendChats";
import { addCart } from "../util/Firebase/addCart";
import { CartBooksSchema } from "../util/TypeDefinition/BooksSchema";
import { getCartBooksIsbn } from "../util/Firebase/getCart";
import { useAuthContext } from "../util/Context/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";

const BooksPage = ({ booksData, clickedBooksIsbn, cartBooksIsbn }: any) => {
  //!クリックされた本のオブジェクトを格納する
  const [clickedBooksValue, setClickedBooksValue] = useState([]);
  //!isBooksChat関数から返される値を格納する
  const [isBooksChatsData, setIsBooksChatsData] = useState([]);
  //!本がカートに入っているか
  const [isBooksCart, setIsBooksCart] = useState(false);
  //!Next Router
  const router = useRouter();

  //!入力されたテキストを保管
  const [isTextInput, setIsTextInput] = useState("");
  const { user } = useAuthContext();
  const isLoggedIn = !!user;

  //!ページにアクセスされたときにAPI通信
  useEffect(() => {
    //!クリックされた本のデータをとってくる
    setClickedBooksValue(booksData);
    //!カートにあるデータを取ってくる
  }, [booksData]);

  //!ページにアクセスされたときに、その本がカートに入ってるかを確認する
  useEffect(() => {
    if (isLoggedIn) {
      getCartBooksIsbn(user.uid).then((value: any) => {
        for (const CartIsbn of value) {
          if (CartIsbn === clickedBooksIsbn) {
            return setIsBooksCart(true);
          }
        }
      });
    }
  }, [clickedBooksIsbn, isLoggedIn, user?.uid]);

  //!ページリロードと同時にFirebaseにチャットがあるかどうかを確認する
  useEffect(() => {
    isBooksChats(clickedBooksIsbn).then((value) => {
      setIsBooksChatsData(value);
    });
  }, [clickedBooksIsbn, isTextInput]);

  return (
    <div className={styles.overall}>
      <Head>
        <title>Book Talk</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="description" content={"あなたの探したい本が見つかるBookTalk"} />
        <meta property="og:url" content={"https://booktalk.vercel.app/Login"} />
        <meta property="og:title" content={"BookTalk"} />
        <meta property="og:site_name" content={"BookTalk"} />
        <meta property="og:description" content={"あなたの探したい本が見つかるBookTalk"} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={"/images/icon.png"} />
      </Head>
      <div className={styles.linkArea}></div>
      {/*本の詳細と画像*/}
      {clickedBooksValue.map((value: any) => {
        return (
          <div key={null} className={styles.booksBox}>
            <div className={styles.booksImage}>
              <img src={value.Item.largeImageUrl} alt="" />
            </div>
            <div className={styles.booksDetail}>
              <div className={styles.booksContents}>
                <h2>{value.Item.title}</h2>
                <p className={styles.booksAuthor}>{value.Item.author}</p>
                <p className={styles.booksPrice}>￥{value.Item.itemPrice}</p>
              </div>
              {isLoggedIn ? (
                <>
                  {!isBooksCart ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault;
                        const CartBooksValue: CartBooksSchema = {
                          userId: user.uid,
                          title: value.Item.title,
                          author: value.Item.author,
                          price: value.Item.itemPrice,
                          image: value.Item.largeImageUrl,
                          isbn: value.Item.isbn,
                        };
                        addCart(CartBooksValue).then(() => {
                          window.alert("カートに追加しました！");
                        });
                      }}
                    >
                      <ShoppingCartIcon className={styles.cartIcon} />
                      カートに追加する
                    </button>
                  ) : (
                    <button className={styles.alreadyBtn}>
                      <CheckIcon className={styles.checkIcon} />
                      <p>追加済</p>
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault;
                    router.push("/Login");
                  }}
                >
                  <ShoppingCartIcon className={styles.cartIcon} />
                  カートに追加する
                </button>
              )}
            </div>
          </div>
        );
      })}
      {/*スレッドエリア*/}
      <div className={styles.threadArea}>
        <div className={styles.threadTitle}>
          <div className={styles.titleContents}>
            <div className={styles.iconImage}>
              <img src="./images/icon.png" alt="" />
            </div>
            <h2>みんなのトーク</h2>
          </div>
        </div>
        {/*TODO:トークを送信するには会員登録をする必要がある(disable)*/}
        <div className={styles.inputArea}>
          <input
            value={isTextInput}
            type="text"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault;
              setIsTextInput(e.target.value);
            }}
            placeholder="トークを送信しよう！！"
          />
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault;
              if (isLoggedIn) {
                sentBooksChat(user?.uid, clickedBooksIsbn, isTextInput).then(() => {
                  setIsTextInput("");
                });
              } else {
                router.push("/Login");
              }
            }}
          >
            送信
          </button>
        </div>
        {/*TODO:スレッドがデータベース内にあるかどうかで表示を切り替え*/}
        {isBooksChatsData ? (
          isBooksChatsData.map((value: any) => {
            return (
              <div key={null} className={styles.unitThread}>
                <div className={styles.userIcon}>
                  <div className={styles.usersIconImg}>
                    <img src={value.Chat.userIcon} alt="" />
                  </div>
                </div>
                <div className={styles.userContents}>
                  <div className={styles.userData}>
                    <div className={styles.userName}>
                      <h2>{value.Chat.userName}</h2>
                      <p>{value.Chat.userId}</p>
                    </div>
                  </div>
                  <div className={styles.userText}>{value.Chat.text}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.noThread}>
            <div className={styles.textBox}>
              <h2>
                ここにはまだ会話がありません！
                <br />
                さっそくこの本の感想を書いて他の人と共有しましょう！
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BooksPage;

export const getServerSideProps = async (context: any) => {
  const { query } = context;
  const isbn = query.value;
  let data = null;
  const response = await fetch(
    `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001&isbnjan=${isbn}&hits=1`
  );
  data = await response.json();
  return {
    props: {
      booksData: data.Items,
      clickedBooksIsbn: isbn,
    },
  };
};
