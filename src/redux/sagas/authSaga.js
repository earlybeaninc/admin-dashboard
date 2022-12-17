import { call, put } from 'redux-saga/effects';

import {
  ON_AUTHSTATE_FAIL,
  ON_AUTHSTATE_SUCCESS,
  RESEND_VERIFY_EMAIL_CODE,
  SIGNIN, SIGNOUT, SIGNUP, VERIFY_EMAIL_CODE
} from '../../constants/constants';
import { ADMIN_API } from '../../services';
import { signInSuccess, signOutSuccess } from '../actions/authActions';
import { setAuthenticating, setAuthStatus} from '../actions/miscActions';
import { clearProfile, setProfile } from '../actions/profileActions';

function* handleError(e) {
  const obj = { success: false, type: 'auth', isError: true };
  yield put(setAuthenticating(false));

  if (e.errors) {
    yield put(setAuthStatus({ ...obj, status: 'error', message: e.message }));
  }
  if (!e.errors && e.message?.token) {
    yield put(setAuthStatus({ ...obj, status: 'error', message: e.message.token[0] }));
  }
  if (!e.errors && e.message) {
    yield put(setAuthStatus({ ...obj, status: 'error', message: e.message }));
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
          password: payload.password,
          email: payload.email
        };
        yield call(ADMIN_API.signIn, auth);
        // TODO: Redirect...

        // TODO: get authenticated user details
        yield put(signInSuccess({
          id: null,
          email: null,
          email_verified_at: null
        }));

      } catch (e) {
        yield put(setAuthenticating(false));
        yield put(setAuthStatus({ 
          success: false, 
          type: 'auth', 
          isError: true, 
          status: e.status, 
          message: e.message 
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
          phone: payload.phone,
          dob: payload.dob
        };
        yield call(ADMIN_API.signUp, user);

        // TODO: get authenticated user details
        yield put(signInSuccess({
          id: null,
          email: payload.email,
          email_verified_at: null
        }));

        yield put(setAuthStatus({
          success: true,
          type: 'auth',
          isError: false,
          message: 'Admin registration successful. Please check your email for a 6-digit code in to verify your email'
        }));

        yield put(setAuthenticating(false));
      } catch (e) {
        console.log(e)
        yield handleError(e);
      }
    break;

    case RESEND_VERIFY_EMAIL_CODE: {
      try {
        yield initRequest();

        const data = {
          email: payload.email
        };
        
        yield call(ADMIN_API.resendVerifyEmailCode, data);
        yield put(setAuthStatus({
          success: true,
          type: 'auth',
          isError: false,
          message: 'A verification mail has been resent to your registered email address.'
        }));

        yield put(setAuthenticating(false));
      } catch (e) {
        console.log(e)
        yield handleError(e);
      }
      break;
    }

    case VERIFY_EMAIL_CODE: {
      try {
        yield initRequest();

        const data = {
          email: payload.email,
          token: payload.token
        };
        
        yield call(ADMIN_API.verifyEmail, data);
    
        yield put(setAuthStatus({
          success: true,
          type: 'auth',
          isError: false,
          message: 'Email verification successful. Redirecting...'
        }));

        // TODO: get authenticated user details
        yield put(signInSuccess({
          id: null,
          email: payload.email,
          email_verified_at: true
        }));

        yield put(setAuthenticating(false));
      } catch (e) {
        console.log(e)
        yield handleError(e);
      }
      break;
    }

    case ON_AUTHSTATE_SUCCESS: {
      const authTokens = JSON.parse(localStorage.getItem('authTokens'));
      const userShot = yield call(ADMIN_API.getAuthenticatedUser, {token: authTokens.access_token});
      console.log(userShot)
      if (userShot) { 
        const user = userShot;

        yield put(setProfile(user, authTokens));
        // TODO: get authenticated user details
        yield put(signInSuccess({
          id: payload.id,
          email: null,
          email_verified_at: null
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

        // localStorage.removeItem('user');
        // const authTokens = JSON.parse(localStorage.getItem('authTokens'));
        // localStorage.removeItem('authTokens');

        // yield put(clearProfile());
        yield put(signOutSuccess());
        yield put(setAuthenticating(false));
        // yield call(ADMIN_API.signOut, {token: authTokens.access_token});
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
