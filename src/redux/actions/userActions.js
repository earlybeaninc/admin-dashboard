import {
  CREATE_CHILD_WALLET,
  GET_USER, UPGRADE_KYC_TIER_1, UPGRADE_KYC_TIER_2
} from '../../constants/constants';

export const getUser = (uId) => ({
  type: GET_USER,
  payload: uId
});

export const UpgardeKycTeir1 = (updates) => ({
  type: UPGRADE_KYC_TIER_1,
  payload: updates
});

export const UpgardeKycTeir2 = (updates) => ({
  type: UPGRADE_KYC_TIER_2,
  payload: updates
});

export const CreateChildWallet = (_payload) => ({
  type: CREATE_CHILD_WALLET,
  payload: _payload
});
