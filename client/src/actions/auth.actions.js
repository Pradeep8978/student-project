import * as types from './../constants/types';
import Axios from './../api'

export const clearLoadingState = () => ({
    type: types.CLEAR_LOADING_STATE
})

const signupLoading = () => ({
    type: types.USER_SIGNUP_LOADING
});

export const signupSuccess = (data) => ({
    type: types.USER_SIGNUP_SUCCESS,
    payload: data
});

const signupFailure = error => ({
    type: types.USER_SIGNUP_FAILURE,
    payload: error
});

const signinLoading = () => ({
    type: types.USER_SIGNIN_LOADING
});

const signinSuccess = (data) => ({
    type: types.USER_SIGNIN_SUCCESS,
    payload: data
});

const signinFailure = error => ({
    type: types.USER_SIGNIN_FAILURE,
    paylod: error
});

export const setAuthHeader = (token) => {
    Axios.defaults.headers.Authorization = token;
    localStorage.setItem('token', token);
}

//fetch user pROFILE
const fetchUserProfileLoading = () => ({
    type: types.FETCH_USER_PROFILE_LOADING
});

const fetchUserProfileSuccess = (data) => ({
    type: types.FETCH_USER_PROFILE_SUCCESS,
    payload: data
});

const fetchUserProfileFailure = error => ({
    type: types.FETCH_USER_PROFILE_FAILURE,
    paylod: error
});


export const fetchUserProfile = () => dispatch => {
    dispatch(fetchUserProfileLoading());
    const url = '/users/profile';
    return Axios.get(url)
    .then(res => {
        dispatch(fetchUserProfileSuccess(res.data));
        return res; 
    })
    .catch(err => {
        dispatch(fetchUserProfileFailure(err));
        throw err;
    })
}


export const signupUser = (bodyParams) => dispatch => {
    dispatch(signupLoading());
    const url = '/users/signup';
    return Axios.post(url, bodyParams)
    .then(res => {
        dispatch(signupSuccess(res.data));
        setAuthHeader(res.data.token);
        return res;
    })
    .catch(err => {
        dispatch(signupFailure(err?.response?.data?.error));
        throw err;
    })
}

export const loginUser = (bodyParams) => dispatch => { debugger
    dispatch(signinLoading());
    const url = '/users/signin';
    return Axios.post(url, bodyParams)
    .then(res => {
        dispatch(signinSuccess(res.data));
        setAuthHeader(res.data.token);
        return res;
    })
    .catch(err => {
        dispatch(signinFailure(err));
        throw err;
    })
}


export const createUser = (bodyParams) => {
    const url = '/product/create' ;
     return Axios.post(url, bodyParams)
     .then(res => {
         return res;
     })
     .catch(err => {
         throw err;
     })
}