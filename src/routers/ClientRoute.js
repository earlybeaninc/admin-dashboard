/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import PropType from 'prop-types';

import * as ROUTES from '../constants/routes';
import { useDidMount } from '../hooks';

// ----------------------------------------------------------------------

/**
 * Authentication guard for routes
 * 
 * @param {PropTypes.bool} isAuth element/bool
 * @param {PropTypes.string} isEmailVerified element/string
 * @param {PropTypes.func} component element/func
 * 
 */

const ClientRoute = ({ isAuth, isEmailVerified, component: Component }) => {
  const didMount = useDidMount(true);

  const location = useLocation();
  const _from = location.state?.from?.pathname || "/";

  if (isAuth && !isEmailVerified) {
    if (didMount) {
      return (
        <>
          <Component />
        </>
      );
    }
  }

	if(isAuth && isEmailVerified) {
    if (didMount) {
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace state={{ location }} />;
    }
  }

  return (
    <Navigate 
      to={ROUTES.SIGNIN}
      replace 
			state={{from: _from }}
    />
  );
  
}

ClientRoute.defaultProps = {
  isAuth: false
};

ClientRoute.propTypes = {
  isAuth: PropType.bool,
  isEmailVerified: PropType.bool,
  component: PropType.func.isRequired
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth,
  isEmailVerified: auth?.email_verified || false
});

export default connect(mapStateToProps)(ClientRoute);
