import { call, put } from 'redux-saga/effects';

import {
  EMAIL_VERIFICATION_SUCCESS_MESSAGE,
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
        const authUser = yield call(ADMIN_API.signIn, auth);
        if (authUser?.data.token) {
          const userSnapshot = yield call(ADMIN_API.getAuthenticatedUser, {token: authUser.data.token});

          localStorage.setItem('user', JSON.stringify(userSnapshot));
          localStorage.setItem('authToken', JSON.stringify(authUser.data));

          yield put(setProfile(userSnapshot.data));
          yield put(signInSuccess({
            id: userSnapshot.data.id,
            email: userSnapshot.data.email,
            email_verified: true
          }));
          
          yield put(setAuthStatus({
            success: true,
            type: 'auth',
            isError: false,
            message: 'Successfully signed in. Redirecting...'
          }));

        } else {
          yield put(signInSuccess({
            id: null,
            email: payload.email,
            email_verified: false
          }));
        }
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

        yield put(signInSuccess({
          id: null,
          email: payload.email,
          email_verified: false
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
        
        const verifyEmail = yield call(ADMIN_API.verifyEmail, data);
        if (verifyEmail) {
          yield put(signOutSuccess());          
          yield put(setAuthStatus({
            success: true,
            type: 'auth',
            isError: false,
            message: EMAIL_VERIFICATION_SUCCESS_MESSAGE
          }));  
        }
        yield put(setAuthenticating(false));
      } catch (e) {
        console.log(e)
        yield handleError(e);
      }
      break;
    }

    case ON_AUTHSTATE_SUCCESS: {
      const authToken = JSON.parse(localStorage.getItem('authToken'));
      const userSnapshot = yield call(ADMIN_API.getAuthenticatedUser, {token: authToken.token});
      if (userSnapshot) { 
        yield put(setProfile(userSnapshot.data));

        yield put(signInSuccess({
          id: userSnapshot.data.id,
          email: userSnapshot.data.email,
          email_verified: true
        }));

        yield put(setAuthStatus({
          success: true,
          type: 'auth',
          isError: false,
          message: 'Successfully signed in. Redirecting...'
        }));
        yield put(setAuthenticating(false));
      }
      break;
    }
  
    case ON_AUTHSTATE_FAIL: {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      yield put(clearProfile());
      yield put(signOutSuccess());
      break;
    }

    case SIGNOUT: {
      try {
        yield initRequest();

        const authToken = JSON.parse(localStorage.getItem('authToken'))

        yield put(clearProfile());
        yield put(signOutSuccess());
        yield put(setAuthenticating(false));
        yield call(ADMIN_API.signOut, {token: authToken.token});

        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
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
