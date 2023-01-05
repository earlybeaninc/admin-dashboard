import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import LoadingScreen from '../../components/LoadingScreen';

const TransactionsComponent = React.lazy(() => import('./components/TransactionsList'));

const TransactionsList = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
        <TransactionsComponent />
      </Suspense>
    </div>
  );
}

export default TransactionsList;