import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS } from '../../constants/constants';

const initState = null;

export default (state = initState, action) => { // eslint-disable-line
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        id: action.payload.id,
        user_type: action.payload.user_type,
        is_active: action.payload.is_active,
        provider: action.payload.provider
      };
    case SIGNOUT_SUCCESS:
      return null;
    default:
      return state;
  }
};
