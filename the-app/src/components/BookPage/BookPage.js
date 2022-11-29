import BasicRating from '../UI components/BasicRating';
import BasicButton from "../UI components/BasicButton";
import { useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getCurrentBook, getFeedBaks } from "../../store/selectors/getListOfBooksSelectors";
import ReadBtn from './readBtn/ReadBtn';
import FavoriteBtn from './favoriteBtn/FavoriteBtn';
import RecommendedBooks from "../recommendedBooks/recommendedBooks";
import DownloadBtn from './downloadBtn/DownloadBtn';
import { currentBookRequest } from '../../store/actions/getListOfBooksActions';
import { getError, getLoading } from '../../store/selectors/commonSelectors';
import Loader from '../UI components/Loader';
import { useEffect } from 'react';
import sample from "../../assets/sample.jpg";
import BasicTabs from '../UI components/BasicTabs';

export const BookPage = ({ authed }) => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(getError);
    const loading = useSelector(getLoading);
    const currentBook = useSelector(getCurrentBook, shallowEqual);
    const feedBack = useSelector(getFeedBaks, shallowEqual);

    let book, title, categories, authors, publishedDate, description, img, id, link, averageRating, ratingsCount;
    currentBook.id === params.id ? book = currentBook : dispatch(currentBookRequest(params.id))

    if (book) {
        title = book.volumeInfo.title;
        categories = book.volumeInfo.categories;
        authors = book.volumeInfo.authors;
        publishedDate = book.volumeInfo.publishedDate;
        description = book?.volumeInfo?.description || book.volumeInfo.subtitle;
        img = book.volumeInfo.imageLinks?.thumbnail || sample;
        id = book.id;
        link = book.accessInfo.epub?.downloadLink;
        averageRating = currentBook.volumeInfo.averageRating;
        ratingsCount = currentBook.volumeInfo.ratingsCount;
    }

    useEffect(() => {
        if (error) navigate(`/404`)
    }, [error])

    return (
        <main className="bookPage">
            <div className="bookPage__wrapper">
                {
                    loading === "pending"
                        ? <Loader />
                        : !book
                            ? null
                            : <>

                                <div className="bookPage__info">
                                    <div className="bookPage__img-wrapper">
                                        <img className="bookPage__img" src={img} alt="BookImage" />
                                    </div>
                                    <div className="bookPage__content" >
                                        <h1 className="bookPage__heading">{title ? title : "Нет информации"}</h1>
                                        <p className="bookPage__text">Категория: {categories ? categories : "Нет информации"}</p>
                                        <p className="bookPage__text">Авторы: {authors ? authors : "Нет информации"}</p>
                                        <p className="bookPage__text">Год: {publishedDate ? publishedDate : "Нет информации"}</p>
                                        <BasicRating
                                            authed={authed}
                                            averageRating={averageRating}
                                            ratingsCount={ratingsCount}
                                            feedBack={feedBack}
                                        />
                                        <div className="bookPage__buttons">
                                            <FavoriteBtn authed={authed}
                                                id={id} book={book} />
                                            <ReadBtn book={book} />
                                            <DownloadBtn authed={authed}
                                                link={link} />
                                            {/* <BasicButton textBtn={"КУПИТЬ"} /> */}
                                        </div>
                                    </div>
                                </div>
                                <BasicTabs
                                    data={description}
                                    feedBack={feedBack}
                                />
                                <RecommendedBooks
                                    categories={categories}
                                    title={"Похожие книги"} />

                            </>
                }
            </div>
        </main >
    )
}