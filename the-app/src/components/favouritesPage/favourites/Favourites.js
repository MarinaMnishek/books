import uniqid from "uniqid";
import { useEffect, useState } from 'react';
import FavouriteBookCard from "../favouriteBookCard/FavouriteBookCard";
import Loader from "../../UI components/Loader";
import { getInfo } from "../../../helpers/getInfoFromFB";

const Favourites = ({ path, onClick }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        getInfo(setData, setLoading, path);
    }, [])

    return (
        <div className={`favourites__${path}`}>
            <h2 className={`favourites__${path}-heading`}>
                {path === "favourites" ? `Избранное(нажмите, чтобы вернуться к странице книги)` : `Недавно открытые для чтения(нажмите, чтобы вернуться к прочтению)`}
            </h2>

            <div className={`favourites__${path}-list`}>
                {loading === "pending"
                    ? <Loader />
                    : data.length
                        ? data.map((book) => (
                            <FavouriteBookCard key={uniqid()} book={book} onClick={onClick} />
                        ))
                        : "Список пуст"
                }
            </div>
        </div >
    )
}

export default Favourites;