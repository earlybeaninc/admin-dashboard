function path(root, sublink) {
	return `${root}${sublink}`;
}

/* API routes */
export const ADMIN_API = process.env.REACT_APP_ADMIN_API;

/* Auth routes */
const ROOTS_AUTH = '/auth';
export const PATH_AUTH = {
	root: ROOTS_AUTH,
	signIn: path(ROOTS_AUTH, '/signin'),
	signUp: path(ROOTS_AUTH, '/signup'),
	logout: path(ROOTS_AUTH, '/logout'),
	verifyCode: path(ROOTS_AUTH, '/verify')
};

export const SIGNIN = '/auth/signin';
export const SIGNOUT = '/auth/logout';
export const SIGNUP = '/auth/signup';
export const VERIFY_CODE = '/auth/verify';

/* Admin routes */  
export const ADMIN_DASHBOARD = '/';

export const PATH_ADMIN = {
	root: path(ADMIN_DASHBOARD, 'dashboard'),
	users: {
		root: path(ADMIN_DASHBOARD, 'users'),
		profile: path(ADMIN_DASHBOARD, 'users/profile'),
		account: path(ADMIN_DASHBOARD, 'users/account'),
		parent: path(ADMIN_DASHBOARD, 'users/parent'),
		kid: path(ADMIN_DASHBOARD, 'users/kid')
	},
	wallet: {
		root: path(ADMIN_DASHBOARD, 'wallet')
	}
};

/* Static routes */
export const PAGE404 = '/404';