import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import LoadingScreen from '../../components/LoadingScreen';

const KidListComponent = React.lazy(() => import('./components/KidList'));

const ParentList = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
        <KidListComponent />
      </Suspense>
    </div>
  );
}

export default ParentList;