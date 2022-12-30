import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import LoadingScreen from '../../components/LoadingScreen';

const ParentsListComponent = React.lazy(() => import('./components/ParentsList'));

const ParentsList = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
        <ParentsListComponent />
      </Suspense>
    </div>
  );
}

export default ParentsList;