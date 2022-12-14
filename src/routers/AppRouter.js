import React from 'react';
import { 
	BrowserRouter as Router,
	Routes, 
	Route
} from 'react-router-dom';

import { createBrowserHistory } from 'history';

import { 
	CreateChildWallet,
	CreditWallet,
	DashboardApp, KidsList, KycUpgrade, KycUpgrade2, 
	Login,Page404, ParentsList, Register,
	TransactionsList, VerifyCode, ViewWallet, 
	WalletsList
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
					path={ROUTES.PATH_AUTH.signIn}
					element={
						<PublicRoute 
							component={Login} 
							path={ROUTES.PATH_AUTH.signIn} 
						/>
					}
				/>
				<Route
					path={ROUTES.PATH_AUTH.signUp}
					element={
						<PublicRoute 
							component={Register} 
							path={ROUTES.PATH_AUTH.signUp}
						/>
					}
				/>
				<Route
					path={ROUTES.PATH_AUTH.verifyCode}
					element={
						<ClientRoute 
							component={VerifyCode} 
							path={ROUTES.PATH_AUTH.verifyCode}
						/>
					}
				/>
				<Route
					path={ROUTES.ADMIN_DASHBOARD}
					element={
						<AdminRoute 
							component={DashboardApp} 
							path={ROUTES.PATH_ADMIN.root} 
						/>
					}
				/>
				<Route
					path={ROUTES.PATH_ADMIN.root}
					element={
						<AdminRoute 
							component={DashboardApp} 
							path={ROUTES.PATH_ADMIN.root} 
						/>
					}
				/>
				<Route
					path={ROUTES.PATH_ADMIN.users.parent}
					element={
						<AdminRoute 
							component={ParentsList} 
							path={ROUTES.PATH_ADMIN.users.parent} 
						/>
					}
				/>
				<Route
					path={ROUTES.PATH_ADMIN.users.kycUpgrade1}
					element={
						<AdminRoute 
							component={KycUpgrade} 
							path={ROUTES.PATH_ADMIN.users.kycUpgrade1} 
						/>
					}
				/>
				<Route
					path={ROUTES.PATH_ADMIN.users.kycUpgrade2}
					element={
						<AdminRoute 
							component={KycUpgrade2} 
							path={ROUTES.PATH_ADMIN.users.kycUpgrade2} 
						/>
					}
				/>
				<Route
					path={ROUTES.PATH_ADMIN.users.kid}
					element={
						<AdminRoute 
							component={KidsList} 
							path={ROUTES.PATH_ADMIN.users.kid} 
						/>
					}
				/>
				<Route
					path={ROUTES.PATH_ADMIN.transactions.root}
					element={
						<AdminRoute 
							component={TransactionsList} 
							path={ROUTES.PATH_ADMIN.transactions.root} 
						/>
					}
				/>
				<Route
					path={ROUTES.PATH_ADMIN.wallet.root}
					element={
						<AdminRoute 
							component={WalletsList} 
							path={ROUTES.PATH_ADMIN.wallet.root} 
						/>
					}
				/>
				<Route
					path={ROUTES.PATH_ADMIN.wallet.credit}
					element={
						<AdminRoute 
							component={CreditWallet} 
							path={ROUTES.PATH_ADMIN.wallet.credit} 
						/>
					}
				/>
				<Route
					path={ROUTES.PATH_ADMIN.wallet.view}
					element={
						<AdminRoute 
							component={ViewWallet} 
							path={ROUTES.PATH_ADMIN.wallet.view} 
						/>
					}
				/>
				<Route
					path={ROUTES.PATH_ADMIN.wallet.createChildWallet}
					element={
						<AdminRoute 
							component={CreateChildWallet} 
							path={ROUTES.PATH_ADMIN.wallet.createChildWallet} 
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