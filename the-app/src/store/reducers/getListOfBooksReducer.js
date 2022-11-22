import { randomBooks1, randomBooks2, randomBooks3 } from "../../helpers/randomBooks";
import { BOOKS_SEARCH, BOOKS_SORT, CURRENT_BOOK, TEXT_SEARCH, TOTAL_BOOK_QUANTITY } from "../types/types";

const initialState = {
    sliderBooks: [
        ...randomBooks1,
        ...randomBooks2,
        ...randomBooks3,
    ],
    books: [],
    currentBook: {},
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
        default:
            return state
    }
}