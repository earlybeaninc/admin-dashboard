import {
  GET_USER
} from '../../constants/constants';

export const getUser = (uid) => ({
  type: GET_USER,
  payload: uid
});
