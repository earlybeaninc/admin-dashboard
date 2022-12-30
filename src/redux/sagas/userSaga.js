import { call, put } from 'redux-saga/effects';

import {UPGRADE_KYC_TIER_1 } from '../../constants/constants';
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
					console.log(update)
					const upgradeUser = yield call(ADMIN_API.upgradeKycTier1, update, {token: authToken.token});
					console.log(upgradeUser)
					yield put(setRequestStatus({
						success: true,
						type: 'user',
						isError: false,
						message: 'Update success!'
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
