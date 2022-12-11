import { REQUEST_METHOD } from ".";
import * as ROUTES from '../constants/routes';

const USER_ROUTE = `${ROUTES.USER_API}/user`
const AUTH_ROUTE = `${ROUTES.USER_API}/auth`

export function signUp(data) {
	return REQUEST_METHOD.post(USER_ROUTE, data)
}

export function signUpVendorDetails(data, kwargs) {
	return REQUEST_METHOD.putFormData(`${AUTH_ROUTE}/user/vendors`, data, kwargs)
}

export function signIn(data) {
	return REQUEST_METHOD.authHeader(`${AUTH_ROUTE}/tokens`, data)
}

export function signOut(data) {
	return REQUEST_METHOD.delete_(`${AUTH_ROUTE}/tokens`, data)
}

export function getRefreshToken(data) {
	return REQUEST_METHOD.put(`${AUTH_ROUTE}/tokens`, data)
}

export function getAuthenticatedUser(kwargs) {
	return REQUEST_METHOD.get(`${USER_ROUTE}/auth`, kwargs)
}

export function updateUserDetails(data, kwargs) {
	return REQUEST_METHOD.put(`${USER_ROUTE}/edit`, data, kwargs)
}

export function addOrUpdateAuthenticatedUserAddress(data, kwargs) {
	return REQUEST_METHOD.put(`${AUTH_ROUTE}/user/address`, data, kwargs)
}

export function addOrUpdateGuestUserAddress(data, kwargs) {
	return REQUEST_METHOD.put(`${USER_ROUTE}/address`, data, kwargs)
}

export function resetUserPassword(data) {
	return REQUEST_METHOD.put(`${AUTH_ROUTE}/tokens/reset`, data)
}

export function forgotUserPassword(data) {
	return REQUEST_METHOD.post(`${AUTH_ROUTE}/tokens/reset`, data)
}
