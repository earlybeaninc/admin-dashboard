import { call, put } from 'redux-saga/effects';

import {
  ON_AUTHSTATE_FAIL,
  ON_AUTHSTATE_SUCCESS,
  SIGNIN, SIGNOUT, SIGNUP
} from '../../constants/constants';
import { ADMIN_API } from '../../services';
import { signInSuccess, signOutSuccess } from '../actions/authActions';
import { setAuthenticating, setAuthStatus} from '../actions/miscActions';
import { clearProfile, setProfile } from '../actions/profileActions';

function* handleError(e) {
  const obj = { success: false, type: 'auth', isError: true };
  yield put(setAuthenticating(false));

  switch (e.code) {
    default:
      yield put(setAuthStatus({ ...obj, message: e.message }));
      break;
  }
}

function* initRequest() {
  yield put(setAuthenticating());
  yield put(setAuthStatus({}));
}

function* authSaga({ type, payload }) {
  switch (type) {
    case SIGNIN:
      try {
        yield initRequest();

        const auth = {
          email: payload.email,
          password: payload.password
        };
        const authUser = yield call(ADMIN_API.signIn, auth);
        const userSnapshot = yield call(ADMIN_API.getAuthenticatedUser, {token: authUser.access_token});
        if (userSnapshot) { 
          const user = userSnapshot;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('authTokens', JSON.stringify(authUser));

          yield put(setProfile(user, authUser));

          yield put(signInSuccess({
            id: userSnapshot.id,
            user_type: userSnapshot.user_type,
            is_active: userSnapshot.is_active,
            provider: userSnapshot.provider
          }));
  
          yield put(setAuthStatus({
            success: true,
            type: 'auth',
            isError: false,
            message: 'Successfully signed in. Redirecting...'
          }));
        }

      } catch (e) {
        console.log(e)
        yield put(setAuthenticating(false));
        yield put(setAuthStatus({ 
          success: false, 
          type: 'auth', 
          isError: true, 
          status: 'error', 
          message: 'Incorrect email or password' 
        }));
      }
      break;
      
    case SIGNUP:
      try {
        yield initRequest();
        const user = {
            first_name: payload.first_name,
            last_name: payload.last_name,
            email: payload.email,
            password: payload.password,
            gender: payload.gender,
            user_type: 'admin',
            is_active: payload.is_active
          };
        
        const auth = {
          email: payload.email,
          password: payload.password
        };
        const refUser = yield call(ADMIN_API.signUp, user);
        const authToken = yield call(ADMIN_API.signIn, auth);
        localStorage.setItem('user', JSON.stringify(refUser));
        localStorage.setItem('authTokens', JSON.stringify(authToken));

        yield put(setProfile(refUser, authToken));

        yield put(signInSuccess({
          id: refUser.id,
          user_type: user.user_type,
          is_active: user.is_active,          
          provider: user.provider
        }));

        yield put(setAuthStatus({
          success: true,
          type: 'auth',
          isError: false,
          message: 'Successfully signed up. Redirecting...'
        }));

        yield put(setAuthenticating(false));
      } catch (e) {
        yield handleError(e);
      }
    break;

    case ON_AUTHSTATE_SUCCESS: {
      const authTokens = JSON.parse(localStorage.getItem('authTokens'));
      const userShot = yield call(ADMIN_API.getAuthenticatedUser, {token: authTokens.access_token});
      console.log(userShot)
      if (userShot) { 
        const user = userShot;

        yield put(setProfile(user, authTokens));
        yield put(signInSuccess({
          id: payload.id,
          user_type: user.user_type,
          is_active: user.is_active,
          provider: user.provider
        }));
      }

      yield put(setAuthStatus({
        success: true,
        type: 'auth',
        isError: false,
        message: 'Successfully signed in. Redirecting...'
      }));
      yield put(setAuthenticating(false));
      break;
    }
  
    case ON_AUTHSTATE_FAIL: {
      localStorage.removeItem('user');
      localStorage.removeItem('authTokens');
      yield put(clearProfile());
      yield put(signOutSuccess());
      break;
    }

    case SIGNOUT: {
      try {
        yield initRequest();

        localStorage.removeItem('user');
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));
        localStorage.removeItem('authTokens');

        yield put(clearProfile());
        yield put(signOutSuccess());
        yield put(setAuthenticating(false));
        yield call(ADMIN_API.signOut, {token: authTokens.access_token});
      } catch (e) {
        console.log(e);
      }
      break;
    }

    default: {
      throw new Error('Unexpected Action Type.');
    }
  }
}

export default authSaga;
