import * as type from '../../constants/constants';

export const signIn = (email, password) => ({
  type: type.SIGNIN,
  payload: {
    email,
    password
  }
});

export const signInWithGoogle = () => ({
  type: type.SIGNIN_WITH_GOOGLE
});

export const signInWithFacebook = () => ({
  type: type.SIGNIN_WITH_FACEBOOK
});

export const signUp = (user) => ({
  type: type.SIGNUP,
  payload: user
});

export const signInSuccess = (auth) => ({
  type: type.SIGNIN_SUCCESS,
  payload: auth
});

export const setAuthPersistence = () => ({
  type: type.SET_AUTH_PERSISTENCE
});

export const signOut = () => ({
  type: type.SIGNOUT
});

export const signOutSuccess = () => ({
  type: type.SIGNOUT_SUCCESS
});

export const onAuthStateChanged = () => ({
  type: type.ON_AUTHSTATE_CHANGED
});

export const onAuthStateSuccess = (user) => ({
  type: type.ON_AUTHSTATE_SUCCESS,
  payload: user
});

export const onAuthStateFail = (error) => ({
  type: type.ON_AUTHSTATE_FAIL,
  payload: error
});

export const resetPassword = (_payload) => ({
  type: type.RESET_PASSWORD,
  payload: _payload
});

export const resendVerifyEmailCode = (email) => ({
  type: type.RESEND_VERIFY_EMAIL_CODE,
  payload: {
    email
  }
});

export const verifyEmailCode = (email, token) => ({
  type: type.VERIFY_EMAIL_CODE,
  payload: {
    email,
    token
  }
});

export const forgotPassword = (email) => ({
  type: type.FORGOT_PASSWORD,
  payload: {
    email
  }
});

