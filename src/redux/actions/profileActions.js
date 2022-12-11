import {
  CLEAR_PROFILE,
  SET_PROFILE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS
} from '../../constants/constants';

export const clearProfile = () => ({
  type: CLEAR_PROFILE
});

export const setProfile = (user, _token) => ({
  type: SET_PROFILE,
  payload: user,
  token: _token
});

export const updateProfile = (newProfile) => ({
  type: UPDATE_PROFILE,
  payload: {
    updates: newProfile.updates,
    credentials: newProfile.credentials
  }
});

export const updateProfileSuccess = (updates) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: updates
});
