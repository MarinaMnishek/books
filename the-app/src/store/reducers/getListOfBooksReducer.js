import { randomBooks1, randomBooks2, randomBooks3 } from "../../helpers/randomBooks";
import {
    BOOKS_SEARCH,
    BOOKS_SORT,
    CURRENT_BOOK,
    TEXT_SEARCH,
    TOTAL_BOOK_QUANTITY,
    BOOK_RATING,
    BOOK_FEEDBACK
} from "../types/types";

const initialState = {
    sliderBooks: [
        ...randomBooks1,
        ...randomBooks2,
        ...randomBooks3,
    ],
    books: [],
    currentBook: {},
    feedBack: [],
    searchParam: '',
    totalBookQuantity: 0,
}

export const getListOfBooksReducer = (state = initialState, { type, data }) => {
    switch (type) {
        case BOOKS_SEARCH:
            return {
                ...state,
                books: data,
            }
        case CURRENT_BOOK:
            return {
                ...state,
                currentBook: data,
            }
        case TEXT_SEARCH:
            return {
                ...state,
                searchParam: data,
            }
        case BOOKS_SORT:
            return {
                ...state,
                books: data,
            }
        case TOTAL_BOOK_QUANTITY:
            return {
                ...state,
                totalBookQuantity: data,
            }
        case BOOK_RATING:
            return {
                ...state,
                currentBook: {
                    ...state.currentBook,
                    volumeInfo: { ...state.currentBook.volumeInfo, ...data },
                }
            }
        case BOOK_FEEDBACK:
            return {
                ...state,
                feedBack: [...state.feedBack, data]
            }
        default:
            return state
    }
}