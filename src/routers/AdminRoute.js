/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';

import PropType from 'prop-types';
import { styled } from '@mui/material/styles';

import { DashboardNavbar, DashboardSidebar } from '../layouts';

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
 * @param {PropTypes.string} user_type element/string
 * @param {PropTypes.func} component element/func
 * 
 */

const AdminRoute = ({ isAuth, userType, component: Component }) => {
  const [open, setOpen] = useState(false);

	if(isAuth && userType === 'admin') {
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

  return (
    <>
      <RootStyle>
        <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <MainStyle>
          <Outlet />
        </MainStyle>
      </RootStyle>
    </>
  );
  
}

AdminRoute.defaultProps = {
  isAuth: false,
  userType: 'admin'
};

AdminRoute.propTypes = {
  isAuth: PropType.bool,
  userType: PropType.string,
  component: PropType.func.isRequired
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth,
  userType: auth?.user_type || ''
});

export default connect(mapStateToProps)(AdminRoute);
