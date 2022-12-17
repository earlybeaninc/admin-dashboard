import { takeLatest } from 'redux-saga/effects';

import * as ACTION from '../../constants/constants';
import authSaga from './authSaga';
import profileSaga from './profileSaga';

function* rootSaga() {
  yield takeLatest([
    ACTION.SIGNIN,
    ACTION.SIGNUP,
    ACTION.SIGNOUT,
    ACTION.SIGNIN_WITH_GOOGLE,
    ACTION.SIGNIN_WITH_FACEBOOK,
    ACTION.ON_AUTHSTATE_CHANGED,
    ACTION.ON_AUTHSTATE_SUCCESS,
    ACTION.ON_AUTHSTATE_FAIL,
    ACTION.SET_AUTH_PERSISTENCE,
    ACTION.RESEND_VERIFY_EMAIL_CODE,
    ACTION.VERIFY_EMAIL_CODE,
    ACTION.FORGOT_PASSWORD,
    ACTION.RESET_PASSWORD
  ], authSaga);
  yield takeLatest([
    ACTION.UPDATE_PROFILE
  ], profileSaga);
}

export default rootSaga;
