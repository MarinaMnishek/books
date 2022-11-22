import { getDoc } from "firebase/firestore";
import { docRef } from "../firebase/firebase";
import sample from "../assets/sample.jpg";

export const getInfo = async (setFunction, setLoading, path) => {
    try {
        if (setLoading) setLoading("pending")
        const userData = await getDoc(docRef)
        const arr = userData._document.data.value.mapValue.fields[path].arrayValue.values
        const currentList = arr.map(item => {
            const { id, title, thumbnail } = item.mapValue.fields;
            const number = id.stringValue;
            const name = title.stringValue;
            const img = thumbnail.stringValue;
            return { id: number, title: name, thumbnail: img }
        })
        setFunction(currentList)
    } catch (error) {
        console.log(error)
        setFunction([])
    } finally {
        if (setLoading) setLoading("")
    }
}

export const adapter = (book) => {
    const { id } = book;
    const { title } = book.volumeInfo;
    const thumbnail = book.volumeInfo.imageLinks?.thumbnail || sample

    const currentBook = {
        id,
        title,
        thumbnail
    }

    return currentBook
}