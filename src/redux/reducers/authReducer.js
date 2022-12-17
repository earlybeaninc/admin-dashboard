import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS } from '../../constants/constants';

const initState = null;

export default (state = initState, action) => { // eslint-disable-line
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        id: action.payload.id,
        email: action.payload.email,
        email_verified_at: action.payload.email_verified_at
      };
    case SIGNOUT_SUCCESS:
      return null;
    default:
      return state;
  }
};
