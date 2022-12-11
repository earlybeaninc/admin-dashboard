import { put } from 'redux-saga/effects';

import {UPDATE_PROFILE } from '../../constants/constants';
import { setLoading } from '../actions/miscActions';

function* profileSaga({type, payload}) {
	switch (type) {
		case UPDATE_PROFILE: {
			try {
				const { password, oldPassword } = payload.credentials;
				yield put(setLoading(true));
		
				const authTokens = JSON.parse(localStorage.getItem('authTokens'));
				if (authTokens) {
					if (password && oldPassword) {
						// yield goes in here
					} else {
						// yield goes in here
					}
				}
				yield put(setLoading(false));

			} catch (e) {
				console.log(e);
				yield put(setLoading(false));
			}
			break;
		}
		default: {
			throw new Error('Unexpected action type.');
		}
	}
}

export default profileSaga;
