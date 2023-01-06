import React, { Suspense } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useWallets } from '../../hooks';
import LoadingScreen from '../../components/LoadingScreen';

const ViewWalletComponent = React.lazy(() => import('./components/ViewWallet'));

const ViewWallet = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const { walletsList } = useWallets();

  const _wallets = walletsList?.data?.data.map((parent) => ({
    id: parent?.id,
	  name: parent?.name,
    acctNo: parent?.account_number,
    acctType: parent?.account_type,
    bankName: parent?.bank_name,
    currency: parent?.currency,
    walletType: parent?.type,
    balance: parent?.balance ,
    parentId: parent?.parent_id ? 'Parent' : 'Child',
    status: parent?.status,
  }));

  return (
    <>
      {_wallets && (
        <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
          <ViewWalletComponent 
            walletId={id} 
            walletList={_wallets}
          />
        </Suspense>
      )}
    </>
  );
}

export default ViewWallet;