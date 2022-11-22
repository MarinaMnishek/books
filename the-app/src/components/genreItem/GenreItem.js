import { bookGenreSearchRequest } from '../../store/actions/getListOfBooksActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const GenreItem = ({ genre }) => {
    const [img, name] = genre;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchGenre = () => {
        dispatch(bookGenreSearchRequest(name, 0));
        navigate(`/genre/${name}`);
    }
    return (
        <div className="genre-item" to={`/genre/${name}`}>
            <img className="genre-item__img" src={img} alt={`жанр ${name}`} onClick={handleSearchGenre} />
        </div>
    )
}

export default GenreItem;