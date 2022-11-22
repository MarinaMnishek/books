import { ERROR, LOADING, LOADING_STATUS, SUCCESS_LOADING } from "../types/types";


const initialState = {
    loading: LOADING_STATUS.IDLE,
    error: null
}
export const commonReducer = (state = initialState, { type, data }) => {
    switch (type) {
        case LOADING:
            return {
                ...state,
                loading: LOADING_STATUS.PENDING,
                error: null
            }
        case ERROR:
            return {
                ...state,
                loading: LOADING_STATUS.ERROR,
                error: data
            };
        case SUCCESS_LOADING:
            return {
                ...state,
                loading: LOADING_STATUS.SUCCESS,
            }
        default:
            return state
    }
}