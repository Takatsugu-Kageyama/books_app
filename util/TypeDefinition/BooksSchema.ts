//!本をカートに追加するときのデータの型
export type CartBooksSchema = {
  userId: string;
  title: string;
  author: string;
  price: string;
  image: string;
  isbn: string;
};
