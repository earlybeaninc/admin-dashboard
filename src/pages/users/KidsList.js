import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import LoadingScreen from '../../components/LoadingScreen';

const KidsListComponent = React.lazy(() => import('./components/KidsList'));

const KidsList = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
        <KidsListComponent />
      </Suspense>
    </div>
  );
}

export default KidsList;