/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import PropType from 'prop-types';
import { styled } from '@mui/material/styles';

import * as ROUTES from '../constants/routes';
import { DashboardNavbar, DashboardSidebar } from '../layouts';
import { useDidMount } from '../hooks';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

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
  const [open, setOpen] = useState(false);
  const didMount = useDidMount(true);

  const location = useLocation();
  const _from = location.state?.from?.pathname || "/";

  if(isAuth && isEmailVerified) {
    if (didMount) {
      return (
        <>
          <RootStyle>
            <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
            <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
            <MainStyle>
              <Component />
            </MainStyle>
          </RootStyle>
        </>
      );
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
