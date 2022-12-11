import { 
  CLEAR_PROFILE, SET_PROFILE, 
  UPDATE_PROFILE_SUCCESS,
} from '../../constants/constants';

export default (state = {}, action) => { // eslint-disable-line
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        ...action.token,
        ...action.payload
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_PROFILE:
      return {};
    default:
      return state;
  }
};
