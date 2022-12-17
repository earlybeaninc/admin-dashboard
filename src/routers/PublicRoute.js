/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {  connect } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import PropType from 'prop-types';

import { ADMIN_DASHBOARD, VERIFY_CODE } from '../constants/routes';
import { useDidMount } from '../hooks';

/**
 * Authentication guard for routes
 * 
 * @param {PropTypes.bool} isAuth element/bool
 * @param {PropTypes.string} userType element/string
 * @param {PropTypes.func} component element/func
 * @param {PropTypes.string} path element/string
 * 
 */

const PublicRoute = ({ isAuth, isEmailVerified, component: Component, path }) => { // eslint-disable-line
  
  const location = useLocation();
  const didMount = useDidMount(true);

  if (isAuth && !isEmailVerified) {
    if (didMount) {
      return <Navigate to={VERIFY_CODE} replace state={{ location }} />;
    }
  }
  if (isAuth && isEmailVerified) {
    if (didMount) {
      return <Navigate to={ADMIN_DASHBOARD} replace state={{ location }} />;
    }
  }

  return (
    <>
      <Component />
    </>
  );
}

PublicRoute.defaultProps = {
  isAuth: false,
  path: '/'
};

PublicRoute.propTypes = {
  isAuth: PropType.bool,
  isEmailVerified: PropType.any,
  component: PropType.func.isRequired,
  path: PropType.string
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth,
  isEmailVerified: auth?.email_verified_at
});

export default connect(mapStateToProps)(PublicRoute);
