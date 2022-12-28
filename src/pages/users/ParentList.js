import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import LoadingScreen from '../../components/LoadingScreen';

const ParentListComponent = React.lazy(() => import('./components/ParentList'));

const ParentList = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
        <ParentListComponent />
      </Suspense>
    </div>
  );
}

export default ParentList;