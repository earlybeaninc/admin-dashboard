import React from 'react';
import { 
	BrowserRouter as Router,
	Routes, 
	Route
} from 'react-router-dom';

import { createBrowserHistory } from 'history';

import { 
	DashboardApp, Login, Page404, Register,
	VerifyCode
}  from '../pages';

import * as ROUTES from '../constants/routes';
import PublicRoute from './PublicRoute';
import AdminRoute from './AdminRoute';
import StaticRoute from './StaticRoute';
import ClientRoute from './ClientRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
	<Router history={history}>
		<>
			<Routes>
				<Route
					path='/'
					element={
						<PublicRoute 
							component={Login} 
							path={ROUTES.SIGNIN} 
						/>
					}
				/>
				<Route
					path={ROUTES.SIGNIN}
					element={
						<PublicRoute 
							component={Login} 
							path={ROUTES.SIGNIN} 
						/>
					}
				/>
				<Route
					path={ROUTES.SIGNUP}
					element={
						<PublicRoute 
							component={Register} 
							path={ROUTES.SIGNUP}
						/>
					}
				/>
				<Route
					path={ROUTES.VERIFY_CODE}
					element={
						<ClientRoute 
							component={VerifyCode} 
							path={ROUTES.VERIFY_CODE}
						/>
					}
				/>
				<Route
					path={ROUTES.ADMIN_DASHBOARD}
					element={
						<AdminRoute 
							component={DashboardApp} 
							path={ROUTES.ADMIN_DASHBOARD} 
						/>
					}
				/>
				<Route
					path={ROUTES.PAGE404}
					element={
						<StaticRoute 
							component={Page404} 
							path={ROUTES.PAGE404} 
						/>
					}
				/>
			</Routes>
		</>
	</Router>	
);
  
export default AppRouter;