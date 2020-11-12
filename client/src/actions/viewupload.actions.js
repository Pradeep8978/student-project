import * as types from '../constants/types';
import Axios from '../api/index'


const fetchViewUploadLoading = () => ({
    type: types.VIEW_UPLOAD_LOADING
});

const fetchViewUploadSuccess = (data) => ({
    type: types.VIEW_UPLOAD_SUCCESS,
    payload: data
});

const fetchViewUploadFailure = error => ({
    type: types.VIEW_UPLOAD_FAILURE,
    paylod: error
});




export const fetchViewupload = () => dispatch => {
    dispatch(fetchViewUploadLoading());
    const url = '/files/list';
    return Axios.get(url)
    .then(res => {
        dispatch(fetchViewUploadSuccess(res.data));
        return res; 
    })
    .catch(err => {
        dispatch(fetchViewUploadFailure(err));
        throw err;
    })
}

