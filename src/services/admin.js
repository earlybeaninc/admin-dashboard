import { REQUEST_METHOD } from ".";
import * as ROUTES from '../constants/routes';

const USER_ROUTE = `${ROUTES.USER_API}/user`
const AUTH_ROUTE = `${ROUTES.USER_API}/auth`

export function signUp(data) {
	return REQUEST_METHOD.post(USER_ROUTE, data)
}

export function signIn(data) {
	return REQUEST_METHOD.authHeader(`${AUTH_ROUTE}/tokens`, data)
}

export function signOut(data) {
	return REQUEST_METHOD.delete_(`${AUTH_ROUTE}/tokens`, data)
}