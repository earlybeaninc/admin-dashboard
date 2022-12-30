import {
  GET_USER, UPGRADE_KYC_TIER_1
} from '../../constants/constants';

export const getUser = (uid) => ({
  type: GET_USER,
  payload: uid
});

export const UpgardeKycTeir1 = (updates) => ({
  type: UPGRADE_KYC_TIER_1,
  payload: updates
});
