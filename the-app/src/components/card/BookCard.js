import { Link } from "react-router-dom";
import BasicRating from '../UI components/BasicRating';
import { useDispatch } from "react-redux";
import { currentBook } from "../../store/actions/getListOfBooksActions";
import sample from "../../assets/sample.jpg";
export const BookCard = ({ book }) => {

  const dispatch = useDispatch();

  const { id } = book;
  const { title, categories, authors, publishedDate, averageRating } = book.volumeInfo;

  return (
    <figure className="book" >
      <div className="book__wrapper">
        <img className="book__img" src={book.volumeInfo.imageLinks?.thumbnail || sample} alt="BookImage" />
      </div>

      <figcaption className="book__description" >
        <h3 className="book__heading">{title ? title : "Нет информации"}</h3>
        <p className="book__text">Категория: {categories ? categories : "Нет информации"}</p>
        <p className="book__text">Авторы: {authors ? authors : "Нет информации"}</p>
        <p className="book__text">Год: {publishedDate ? publishedDate : "Нет информации"}</p>
        <BasicRating
          averageRating={averageRating}
          book={book}
        />
      </figcaption>
      <Link className="book__link" to={`/book/${id}`} onClick={() => dispatch(currentBook(book))}>
        Подробнее...
      </Link>
    </figure >
  );
}
