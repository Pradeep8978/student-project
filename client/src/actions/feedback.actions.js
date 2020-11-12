import * as types from '../constants/types';
import Axios from '../api/index'


const fetchFeedbackLoading = () => ({
    type: types.FEEDBACK_LOADING
});

const fetchFeedbackSuccess = (data) => ({
    type: types.FEEDBACK_SUCCESS,
    payload: data
});

const fetchFeedbackFailure = error => ({
    type: types.FEEDBACK_FAILURE,
    paylod: error
});




export const fetchFeeback = () => dispatch => {
    dispatch(fetchFeedbackLoading());
    const url = '/feedback/list';
    return Axios.get(url)
    .then(res => {
        dispatch(fetchFeedbackSuccess(res.data));
        return res; 
    })
    .catch(err => {
        dispatch(fetchFeedbackFailure(err));
        throw err;
    })
}

