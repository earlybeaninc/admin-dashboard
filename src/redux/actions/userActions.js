import {
  CREATE_CHILD_WALLET,
  CREDIT_WALLET,
  GET_USER, UPGRADE_KYC_TIER_1, UPGRADE_KYC_TIER_2
} from '../../constants/constants';

export const getUser = (uId) => ({
  type: GET_USER,
  payload: uId
});

export const UpgardeKycTeir1 = (_payload) => ({
  type: UPGRADE_KYC_TIER_1,
  payload: _payload
});

export const UpgardeKycTeir2 = (updates) => ({
  type: UPGRADE_KYC_TIER_2,
  payload: updates
});

export const CreateChildWallet = (_payload) => ({
  type: CREATE_CHILD_WALLET,
  payload: _payload
});

export const CreditWallet = (_payload) => ({
  type: CREDIT_WALLET,
  payload: _payload
});
