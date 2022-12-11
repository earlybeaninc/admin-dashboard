import authReducer from './authReducer';
import miscReducer from './miscReducer';
import profileReducer from './profileReducer';
import userReducer from './userReducer';

const rootReducer = {
  auth: authReducer,
  profile: profileReducer,
  users: userReducer,
  app: miscReducer
};

export default rootReducer;
