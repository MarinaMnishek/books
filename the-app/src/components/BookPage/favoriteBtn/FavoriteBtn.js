import BasicButton from "../../UI components/BasicButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getDoc, setDoc } from "firebase/firestore";
import { docRef } from "../../../firebase/firebase";
import { useEffect, useState } from "react";
import { adapter, getInfo } from "../../../helpers/getInfoFromFB";


const FavoriteBtn = ({ book, authed }) => {

    const [isFavorite, setIsFavourite] = useState(false)
    const [data, setData] = useState([])

    const currentBook = adapter(book);

    useEffect(() => {
        getInfo(setData, null, "favourites")
    }, [])

    useEffect(() => {
        if (data.length) {
            const isInTheList = data.findIndex(item => item.id === currentBook.id) === -1;
            !isInTheList ? setIsFavourite(true) : setIsFavourite(false)
        }
    }, [data])

    const addToFavourites = async () => {
        try {
            setIsFavourite(!isFavorite)
            const newFavourites = !isFavorite
                ? [...data, currentBook]
                : data.filter(item => item.id !== currentBook.id)
            await setDoc(docRef, { favourites: newFavourites }, { merge: true });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <BasicButton textBtn={"В ИЗБРАННОЕ"} authed={authed} handleDoing={addToFavourites} >
            {!isFavorite
                ? <FavoriteIcon sx={{
                    marginRight: "10px",
                    color: "white"
                }} />
                : <FavoriteIcon sx={{
                    marginRight: "10px",
                    color: "red"
                }} />}
        </BasicButton>
    )
}

export default FavoriteBtn;