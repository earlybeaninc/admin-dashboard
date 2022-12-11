/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {  connect } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import PropType from 'prop-types';

import { ADMIN_DASHBOARD } from '../constants/routes';
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

const PublicRoute = ({ isAuth, userType, isActive, component: Component, path }) => { // eslint-disable-line
  
  const location = useLocation();
  const didMount = useDidMount(true);

  if (isAuth && userType === 'admin' && isActive) {
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
  userType: 'user',
  isActive: false,
  path: '/'
};

PublicRoute.propTypes = {
  isAuth: PropType.bool,
  userType: PropType.string,
  isActive: PropType.bool,
  component: PropType.func.isRequired,
  path: PropType.string
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth,
  userType: auth?.user_type || '',
  isActive: auth?.is_active || false
});

export default connect(mapStateToProps)(PublicRoute);
