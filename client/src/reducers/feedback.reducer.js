import * as types from "../constants/types";

const INITIAL_STATE = {
  loading: false,
  feedbackList: [],
  error: null,
};

const FeedbackReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.FEEDBACK_LOADING:
      return {
        ...state,
        loading: true,
        feedbackList: [],
        error: null,
      };
    case types.FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        feedbackList: payload,
        error: null,
      };
    case types.FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        feedbackList: [],
        error: payload,
      };

    default:
      return state;
  }
};

export default FeedbackReducer;
