import React, { Suspense } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useUsers } from '../../hooks';
import LoadingScreen from '../../components/LoadingScreen';

const KycUpgradeComponent = React.lazy(() => import('./components/KycUpgrade'));

const KycUpgrade = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const { parentsList } = useUsers();

  const _parentList = parentsList?.data?.data.map((parent) => ({
    id: parent?.id,
    userId: parent?.user_id,
    profileImage: parent?.profile_image ? parent?.profile_image : '',
    name: `${parent.first_name} ${parent?.last_name}`,
    gender: parent?.gender,
    dob: parent?.dob,
    email: parent?.email,
    kycTier: parent?.kyc_tier,
    isBvnVerified: parent?.is_bvn_verified,
    isNinVerified: parent?.is_nin_verified,
    address: parent?.address,
    country: parent?.country,
    bvn: parent?.bvn,
    placeOfBirth: parent?.place_of_birth,
  }));

  return (
    <>
      {_parentList && (
        <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
          <KycUpgradeComponent 
            parentId={id} 
            parentList={_parentList}
          />
        </Suspense>
      )}
    </>
  );
}

export default KycUpgrade;