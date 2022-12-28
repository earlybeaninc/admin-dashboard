/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import PropType from 'prop-types';
// import { styled } from '@mui/material/styles';

import * as ROUTES from '../constants/routes';
// import { DashboardNavbar, DashboardSidebar } from '../layouts';
import { useDidMount } from '../hooks';
import { DashboardLayout } from '../layouts';

// ----------------------------------------------------------------------

/**
 * Authentication guard for routes
 * 
 * @param {PropTypes.bool} isAuth element/bool
 * @param {PropTypes.string} isEmailVerified element/string
 * @param {PropTypes.func} component element/func
 * 
 */

const AdminRoute = ({ isAuth, isEmailVerified, component: Component }) => {
  const didMount = useDidMount(true);

  const location = useLocation();
  const _from = location.state?.from?.pathname || "/";

  if(isAuth && isEmailVerified) {
    if (didMount) {
      return (
        <>
          <DashboardLayout component={Component} />
        </>
      );
    }
  }

  return (
    <Navigate 
      to={ROUTES.PATH_AUTH.signIn}
      replace 
			state={{from: _from }}
    />
  );
  
}

AdminRoute.defaultProps = {
  isAuth: false
};

AdminRoute.propTypes = {
  isAuth: PropType.bool,
  isEmailVerified: PropType.bool,
  component: PropType.func.isRequired
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth,
  isEmailVerified: auth?.email_verified || false
});

export default connect(mapStateToProps)(AdminRoute);
