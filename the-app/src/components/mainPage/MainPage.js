import Genre from "./genre/Genre";
import BookSliders from "./BookSliders/BookSliders";


const MainPage = () => {

    return (
        <main className='main'>
            <div className="main__content">
                <h1 className="main__heading">
                    Рады приветствовать Вас на сайте-агрегаторе книг!
                </h1>
                <BookSliders />
                <Genre />
            </div>
        </main>
    )
}


export default MainPage;
