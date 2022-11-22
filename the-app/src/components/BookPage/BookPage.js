import BasicRating from '../UI components/BasicRating';
import BasicButton from "../UI components/BasicButton";
import { useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getCurrentBook } from "../../store/selectors/getListOfBooksSelectors";
import ReadBtn from './readBtn/ReadBtn';
import FavoriteBtn from './favoriteBtn/FavoriteBtn';
import RecommendedBooks from "../recommendedBooks/recommendedBooks";
import DownloadBtn from './downloadBtn/DownloadBtn';
import { currentBookRequest } from '../../store/actions/getListOfBooksActions';
import { getError, getLoading } from '../../store/selectors/commonSelectors';
import Loader from '../UI components/Loader';
import { useEffect } from 'react';
import sample from "../../assets/sample.jpg";

export const BookPage = ({ authed }) => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(getError);
    const loading = useSelector(getLoading);
    const currentBook = useSelector(getCurrentBook, shallowEqual);

    let book, title, categories, authors, publishedDate, description, img, id, link;
    currentBook.id === params.id ? book = currentBook : dispatch(currentBookRequest(params.id))

    if (book) {
        title = book.volumeInfo.title;
        categories = book.volumeInfo.categories;
        authors = book.volumeInfo.authors;
        publishedDate = book.volumeInfo.publishedDate;
        description = book?.volumeInfo?.description || book.volumeInfo.subtitle;
        img = book.volumeInfo.imageLinks?.thumbnail || sample;
        id = book.id;
        link = book.accessInfo.epub?.downloadLink
    }

    useEffect(() => {
        if (error) navigate(`/404`)
    }, [error])


    return (
        <div className="bookPage">
            {
                loading === "pending"
                    ? <Loader />
                    : !book
                        ? null
                        : <>
                            <div className="bookPage__wrapper">
                                <img className="bookPage__img" src={img} alt="BookImage" />
                                <div className="bookPage__startInfo" >
                                    <h3 className="bookPage__startInfo-title boldText">{title ? title : "Нет информации"}</h3>
                                    <p className="">Категория: {categories ? categories : "Нет информации"}</p>
                                    <p className="">Авторы: {authors ? authors : "Нет информации"}</p>
                                    <p className="">Год: {publishedDate ? publishedDate : "Нет информации"}</p>
                                    <div>
                                        <BasicRating authed={authed} />
                                    </div>
                                    <div className="book__buttons">
                                        <FavoriteBtn authed={authed}
                                            id={id} book={book} />
                                        <ReadBtn book={book} />
                                        <DownloadBtn authed={authed}
                                            link={link} />
                                        <BasicButton textBtn={"КУПИТЬ"} />
                                    </div>
                                </div>

                            </div>
                            <div className="bookPage__description">
                                <h4 className="bookPage__description-title genre__heading">О книге:</h4>
                                <p className="">{description ? description : "Нет информации"}</p>
                            </div>
                            <RecommendedBooks
                                categories={categories}
                                title={"Похожие книги"} />

                        </>
            }
        </div >
    )
}