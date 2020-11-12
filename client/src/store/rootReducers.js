import {combineReducers} from 'redux';
import auth from './../reducers/auth.reducer';
import feedback from './../reducers/feedback.reducer'

export default combineReducers({
    auth,
    feedback
});
