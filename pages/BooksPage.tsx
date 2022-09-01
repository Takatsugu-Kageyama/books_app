//スタイル
import styles from "../styles/booksPage.module.scss";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { isBooksChats } from "../util/Firebase/booksChatAuth";
import { sentBooksChat } from "../util/Firebase/sendChats";
import { addCart } from "../util/Firebase/addCart";
import { CartBooksSchema } from "../util/TypeDefinition/BooksSchema";

const BooksPage = () => {
  const router = useRouter(); //!routerの初期化設定
  const [clickedBooksValue, setClickedBooksValue] = useState([]); //!クリックされた本のオブジェクトを格納する
  const [isBooksChatsData, setIsBooksChatsData] = useState([]); //!isBooksChat関数から返される値を格納する
  const clickedBooksIsbnNum = router.query.value; //!別ページにてクリックされた本のISBN番号を格納
  const [isTextInput, setIsTextInput] = useState(""); //!入力されたテキストを保管
  //!ページにアクセスされたときにAPI通信
  useEffect(() => {
    const fetchClickedBook = async () => {
      const booksValue = await axios(
        `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001&isbnjan=${clickedBooksIsbnNum}&hits=1`
      );
      setClickedBooksValue(booksValue.data.Items);
    };
    fetchClickedBook();
  }, []);

  //!ページリロードと同時にFirebaseにチャットがあるかどうかを確認する
  useEffect(() => {
    isBooksChats(clickedBooksIsbnNum).then((value) => {
      setIsBooksChatsData(value);
    });
    console.log(isBooksChatsData);
  }, [isTextInput]);
  // console.log(clickedBooksValue);
  return (
    <div className={styles.overall}>
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
              <button
                onClick={(e) => {
                  e.preventDefault;
                  const CartBooksValue: CartBooksSchema = {
                    userId: "I7PXmd8olYKMk0SYEnuP",
                    title: value.Item.title,
                    author: value.Item.author,
                    price: value.Item.itemPrice,
                    image: value.Item.largeImageUrl,
                    isbn: value.Item.isbn,
                  };
                  console.log(CartBooksValue);
                  addCart(CartBooksValue);
                }}
              >
                <ShoppingCartIcon />
                カートに追加する
              </button>
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
              sentBooksChat(clickedBooksIsbnNum, isTextInput).then(() => {
                setIsTextInput("");
              });
            }}
          >
            トークする
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
                    <div className={styles.upDateTime}>
                      <p>{value.Chat.time}</p>
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
