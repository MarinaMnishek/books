import uniqid from "uniqid";
import { genres } from "../../helpers/genres";
import GenreItem from "../genreItem/GenreItem";
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const GenreList = () => {
    //количество старниц
    const pages = Math.ceil(genres.length / 9);

    const navigate = useNavigate();
    const location = useLocation();

    const currentPage = +location.pathname.slice(8);

    const [page, setPage] = useState(currentPage ? currentPage : 1);

    useEffect(() => {
        if (!currentPage || currentPage > pages) {
            setPage(1);
            navigate(`/genres/1`);
        }
        if (currentPage < page) {
            setPage(1);
        }
    }, [currentPage])

    const handleChange = (event, value) => {
        setPage(value);
        navigate(`/genres/${value}`)
    };

    return (
        <main className="genre-list">
            <div className="genre-list__content">
                <h1 className="genre-list__heading">
                    Доступные жанры произведений.
                </h1>

                <div className="genre-list__list">
                    {genres.slice((page - 1) * 9, 9 * page).map(genre => <GenreItem key={uniqid()} genre={genre} />)}
                </div>
                <Pagination
                    color="secondary"
                    count={pages}
                    page={page}
                    onChange={handleChange}
                    size="large"
                    variant="outlined" />
            </div>
        </main>
    )
}