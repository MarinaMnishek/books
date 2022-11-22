import { BookCard } from "../card/BookCard";
import uniqid from "uniqid";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getBooks, getSearchName, getTotalQuantity } from "../../store/selectors/getListOfBooksSelectors";
import { getError, getLoading } from "../../store/selectors/commonSelectors";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Pagination from '@mui/material/Pagination';
import { bookGenreSearchRequest, bookSearchRequest, booksSortBySortMethod, booksSortRequest, sortBooksByTitle } from "../../store/actions/getListOfBooksActions";
import Loader from "../UI components/Loader";
import { translate } from "../../helpers/genres";
import Sorting from "../UI components/Sorting";

export const BooksList = ({ genre }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let books = useSelector(getBooks, shallowEqual);
    const error = useSelector(getError);
    const loading = useSelector(getLoading);

    const searchName = useSelector(getSearchName);
    const totalBookQuantity = useSelector(getTotalQuantity);

    const pages = Math.ceil(totalBookQuantity / 27);
    const currentPage = genre ? +location.pathname.slice(7) : +location.pathname.slice(11);

    const [page, setPage] = useState(currentPage ? currentPage : 1);

    const [sortParam, setSortParam] = useState('');

    useEffect(() => {
        if (!currentPage || currentPage > pages) {
            setPage(1);
            genre ? navigate(`/genre/1`) : navigate(`/bookslist/1`);
        }
        if (currentPage < page) {
            setPage(1);
        }
    }, [currentPage])

    useEffect(() => {
        if (error) navigate(`/404`)
    }, [error])

    useEffect(() => {
        if (!books.length && loading === "idle") navigate(`/`)
    }, [books.length, loading])

    const sortBooks = (arr, arg) => {
        arr.sort((a, b) => a.volumeInfo[arg] > b.volumeInfo[arg] ? 1 : -1);
        dispatch(booksSortBySortMethod(searchName, arr, totalBookQuantity));
        // dispatch(sortBooksByTitle(searchName, arr));
    }

    const toSortBooks = (param) => {
        setSortParam(param);
        dispatch(booksSortRequest(searchName, (27 * (currentPage - 1) + 1), param));
        // setPage(value);
        // genre ? navigate(`/genre/${value}`) : navigate(`/bookslist/${value}`);
    }

    const handleChange = (event, value) => {
        genre
            ? dispatch(bookGenreSearchRequest(searchName, (27 * (currentPage - 1) + 1), sortParam))
            : dispatch(bookSearchRequest(searchName, (27 * (currentPage - 1) + 1), sortParam))
        setPage(value);
        genre ? navigate(`/genre/${value}`) : navigate(`/bookslist/${value}`);
    };

    return (

        <main className='books-list'>
            <div className="books-list__content">
                {loading === "pending"
                    ? <Loader />
                    : error
                        ? null
                        : books.length
                            ? <>
                                {!genre
                                    ? <h2 className="books-list__heading">
                                        Результаты поиска по запросу представлены ниже.
                                    </h2>
                                    : <h2 className="books-list__heading">
                                        Результаты поиска по жанру <span>"{translate[searchName]}"</span>  представлены ниже.
                                    </h2>
                                }
                                <Sorting
                                    sortBooks={sortBooks}
                                    toSortBooks={toSortBooks}
                                    books={books}
                                />
                                <div className="books-list__list">
                                    {books.map((book) => (
                                        <BookCard key={uniqid()} book={book} />
                                    ))}
                                </div>
                                <Pagination
                                    color="secondary"
                                    count={pages}
                                    page={page}
                                    onChange={handleChange}
                                    size="middle"
                                    variant="outlined" />
                            </>
                            : null
                }
            </div>
        </main>

    )
}