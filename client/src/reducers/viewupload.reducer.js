import * as types from "../constants/types";

const INITIAL_STATE = {
  loading: false,
  viewUploadList: [],
  error: null,
};

const ViewUploadReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.VIEW_UPLOAD_LOADING:
      return {
        ...state,
        loading: true,
        viewUploadList: [],
        error: null,
      };
    case types.VIEW_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        viewUploadList: payload,
        error: null,
      };
    case types.VIEW_UPLOAD_FAILURE:
      return {
        ...state,
        loading: false,
        viewUploadList: [],
        error: payload,
      };

    default:
      return state;
  }
};

export default ViewUploadReducer;
