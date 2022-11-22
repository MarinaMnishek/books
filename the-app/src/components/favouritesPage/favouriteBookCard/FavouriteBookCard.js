const FavouriteBookCard = ({ book, onClick }) => {
    const { id, title, thumbnail } = book;
    return (
        <figure className="favourite-book" onClick={() => onClick(id)} >
            <div className="favourite-book__wrapper">
                <img className="favourite-book__img" src={thumbnail} alt="BookImage" />
            </div>

            <figcaption className="favourite-book__description" >
                <h3 className="favourite-book__heading">{title ? title : "Нет информации"}</h3>
            </figcaption>
        </figure >
    );
}

export default FavouriteBookCard;