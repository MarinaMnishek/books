import { ERROR, LOADING, SUCCESS_LOADING } from "../types/types"


export const setLoading = () => {
    return {
        type: LOADING,
    }
}
export const setError = (data) => {
    return {
        type: ERROR,
        data
    }
}
export const setSuccess = () => {
    return {
        type: SUCCESS_LOADING,
    }
}