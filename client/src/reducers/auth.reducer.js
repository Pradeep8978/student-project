import * as types from './../constants/types';

const authReducer = (state = {}, { type, payload }) => {
    console.log("paylod", payload)
    switch (type) {
        case types.USER_SIGNUP_LOADING:
        case types.USER_SIGNIN_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
                token: null,
                profile: null
            }
        case types.USER_SIGNUP_SUCCESS:
        case types.USER_SIGNIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: payload.token,
                profile: payload.profile
            }
        case types.USER_SIGNUP_FAILURE:
        case types.USER_SIGNIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case types.FETCH_USER_PROFILE_LOADING:
            return {
                ...state,
                profileLoading: true,
                profileError: null,
                profile: {}
            }
        case types.FETCH_USER_PROFILE_SUCCESS:
            return {
                ...state,
                profileLoading: false,
                profile: payload
            }
        case types.FETCH_USER_PROFILE_FAILURE:
            return {
                ...state,
                profileLoading: false,
                profileError: payload
            }
        case types.CLEAR_LOADING_STATE:
            return {
                ...state,
                loading: false,
                error: false
            }
        default:
            return state;
    }
}

export default authReducer;