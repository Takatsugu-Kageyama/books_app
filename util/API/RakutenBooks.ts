import axios from "axios";

//各ジャンルのAPIを取得する関数を設定
//漫画
export const fetchComicData = async () => {
  const result = await axios(
    "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001001&hits=5"
  );

  return result;
};
//語学・学習参考書
export const fetchLightNovelData = async () => {
  const result = await axios(
    "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001017&hits=5"
  );
  return result;
};

//絵本・児童書
export const fetchPictureBookData = async () => {
  const result = await axios(
    "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001003&hits=5"
  );
  return result;
};
// //新書
// export const fetchContemporaryBookData = async () => {
//   const result = await axios(
//     "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001020&hits=5"
//   );
//   return result;
// };
// //ライトノベル
// export const fetchLightNovelData = async () => {
//   const result = await axios(
//     "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001017&hits=5"
//   );
//   return result;
// };

//各ジャンルのソートAPIを取得

//★漫画
//新着順
export const fetchComicNewSortData = async () => {
  const result = await axios(
    "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001001&sort=-releaseDate&hits=5"
  );

  return result;
};
//売上
export const fetchComicEarningsSortData = async () => {
  const result = await axios(
    "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001001&sort=sales&hits=5"
  );
  return result;
};
//レビュー
export const fetchEvaluationSortData = async () => {
  const result = await axios(
    "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1030475744401461181&booksGenreId=001001&sort=reviewAverage&hits=5"
  );
  return result;
};
