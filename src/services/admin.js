import { REQUEST_METHOD } from ".";
import * as ROUTES from '../constants/routes';

const ADMIN_AUTH_ROUTE = `${ROUTES.ADMIN_API}/auth`
const ADMIN_USERS_ROUTE = `${ROUTES.ADMIN_API}/users`

/** Auth endpoints */
export function signUp(data) {
	return REQUEST_METHOD.post(`${ADMIN_AUTH_ROUTE}/register`, data)
}
export function signIn(data) {
	return REQUEST_METHOD.authHeader(`${ADMIN_AUTH_ROUTE}/login`, data)
}
export function verifyEmail(data) {
	return REQUEST_METHOD.post(`${ADMIN_AUTH_ROUTE}/verify-email`, data)
}
export function resendVerifyEmailCode(data) {
	return REQUEST_METHOD.post(`${ADMIN_AUTH_ROUTE}/verify-email/resend`, data)
}
export function forgotPassword(data) {
	return REQUEST_METHOD.post(`${ADMIN_AUTH_ROUTE}/forgot-password`, data)
}
export function resendEmailOtpCode(kwargs) {
	return REQUEST_METHOD.post(`${ADMIN_AUTH_ROUTE}/verify-email/resend`, kwargs)
}
export function verifyForgotPassword(kwargs) {
	return REQUEST_METHOD.post(`${ADMIN_AUTH_ROUTE}/forget-password/verification`, kwargs)
}
export function resetPassword(kwargs) {
	return REQUEST_METHOD.post(`${ADMIN_AUTH_ROUTE}/reset-password`, kwargs)
}
export function signOut(kwargs) {
	const data = {}
	return REQUEST_METHOD.post(`${ADMIN_AUTH_ROUTE}/logout`, data, kwargs)
}


/** User endpoints */
export function getAuthenticatedUser(kwargs) {
	return REQUEST_METHOD.get(`${ADMIN_USERS_ROUTE}/my-profile`, kwargs)
}
export function upgradeKycTier1(data, kwargs) {
	return REQUEST_METHOD.put(`${ADMIN_USERS_ROUTE}/upgrade/t1`, data, kwargs)
}
export function upgradeKycTier2(data, kwargs) {
	return REQUEST_METHOD.put(`${ADMIN_USERS_ROUTE}/upgrade/t2`, data, kwargs)
}