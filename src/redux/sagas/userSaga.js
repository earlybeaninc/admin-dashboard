import { call, put } from 'redux-saga/effects';

import { 
	CREATE_CHILD_WALLET, CREDIT_WALLET, UPGRADE_KYC_TIER_1, 
	UPGRADE_KYC_TIER_2 
} from '../../constants/constants';
import { setLoading, setRequestStatus } from '../actions/miscActions';
import { ADMIN_API } from '../../services';

function* initRequest() {
	yield put(setLoading(true));
	yield put(setRequestStatus(null));
}

function* handleError(e) {
	const obj = { success: false, type: 'auth', isError: true };
	yield put(setLoading(false));

	yield put(setRequestStatus({ ...obj, status: 'error', message: e.message }));
}

function* userSaga({type, payload}) {
	switch (type) {
		case UPGRADE_KYC_TIER_1: {
			try {
				yield initRequest();
		
				const authToken = JSON.parse(localStorage.getItem('authToken'));
				if (authToken) {
					const update = {
						place_of_birth: payload.place_of_birth,
						bvn: payload.bvn,
						email: payload.email,
						address: payload.address,
						dob: payload.dob,
						gender: payload.gender,
						country: payload.country,
						image: payload.image,
						user_id: payload.user_id
					};
					const res = yield call(ADMIN_API.upgradeKycTier1, update, {token: authToken.token});
					yield put(setRequestStatus({
						success: true,
						type: 'user',
						isError: false,
						message: res.message
					  }));
				}
				yield put(setLoading(false));

			} catch (e) {
				console.log(e);
				yield handleError(e);
			}
			break;
		}
		case UPGRADE_KYC_TIER_2: {
			try {
				yield initRequest();
		
				const authToken = JSON.parse(localStorage.getItem('authToken'));
				if (authToken) {
					const update = {
						means_of_id: payload.means_of_id,
						email: payload.email,
						image: payload.image,
						user_id: payload.user_id
					};
					const res = yield call(ADMIN_API.upgradeKycTier2, update, {token: authToken.token});
					yield put(setRequestStatus({
						success: true,
						type: 'user',
						isError: false,
						message: res.message
						}));
				}
				yield put(setLoading(false));

			} catch (e) {
				console.log(e);
				yield handleError(e);
			}
			break;
		}

		case CREATE_CHILD_WALLET: {
			try {
				yield initRequest();
		
				const authToken = JSON.parse(localStorage.getItem('authToken'));
				if (authToken) {
					let update = {}
					if (payload?.kidId) {
						update = {
							kid_id: payload.kidId,
							wallet_type: payload.walletType,
							user_id: payload.userId
						};
					}
					else {
						update = {
							first_name: payload.firstName,
							last_name: payload.lastName,
							email: payload.email,
							phone: payload.phone,
							dob: payload.dob,
							attachments: payload.attachments ? payload.attachments : [],
							gender: payload.gender,
							wallet_type: payload.walletType,
							currency: payload.currency,
							user_id: payload.userId
						};
					}
					const res = yield call(ADMIN_API.createChildWallet, update, {token: authToken.token});
					yield put(setRequestStatus({
						success: true,
						type: 'wallet',
						isError: false,
						message: res.message
					}));
				}
				yield put(setLoading(false));

			} catch (e) {
				console.log(e);
				yield handleError(e);
			}
			break;
		}

		case CREDIT_WALLET: {
			try {
				yield initRequest();
		
				const authToken = JSON.parse(localStorage.getItem('authToken'));
				if (authToken) {
					const update = {
						wallet_id: payload.walletId,
						amount: payload.amount,
						narration: payload.narration
					};
					const res = yield call(ADMIN_API.creditWallet, update, {token: authToken.token});
					yield put(setRequestStatus({
						success: true,
						type: 'wallet',
						isError: false,
						message: res.message
					}));
				}
				yield put(setLoading(false));

			} catch (e) {
				console.log(e);
				yield handleError(e);
			}
			break;
		}
		default: {
			throw new Error('Unexpected action type.');
		}
	}
}

export default userSaga;
