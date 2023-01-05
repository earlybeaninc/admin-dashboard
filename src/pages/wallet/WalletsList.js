import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import LoadingScreen from '../../components/LoadingScreen';

const WalletsListComponent = React.lazy(() => import('./components/WalletsList'));

const WalletsList = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
        <WalletsListComponent />
      </Suspense>
    </div>
  );
}

export default WalletsList;