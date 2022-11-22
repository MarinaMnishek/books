import Favourites from "./favourites/Favourites";
import BuyList from "./buyList/BuyList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentBookRequest } from "../../store/actions/getListOfBooksActions";


const FavouritesPage = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const onRead = (id) => navigate(`/read/${id}`);
    const onFavourites = (id) => {
        dispatch(currentBookRequest(id));
        navigate(`/book/${id}`);
    }

    return (
        <main className="favourites">
            <div className="favourites__content">
                <h1 className='favourites__heading'>
                    Мои книги
                </h1>
                <Favourites path={"favourites"} onClick={onFavourites} />
                <Favourites path={"recent"} onClick={onRead} />
                <BuyList />
            </div>
        </main>
    )
};

export default FavouritesPage;