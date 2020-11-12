import {combineReducers} from 'redux';
import auth from './../reducers/auth.reducer';
import feedback from './../reducers/feedback.reducer';
import Viewupload from './../reducers/viewupload.reducer'

export default combineReducers({
    auth,
    feedback,
    Viewupload
});
