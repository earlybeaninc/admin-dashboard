import PropTypes from 'prop-types';
import { capitalCase } from 'change-case';
// @mui
import { Container } from '@mui/material';
// routes
import * as ROUTES from '../../../constants/routes';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import CreditWalletForm from '../../../sections/@dashboard/wallet/CreditWalletForm';

// ----------------------------------------------------------------------

CreditWallet.propTypes = {
  walletId: PropTypes.string,
  walletList: PropTypes.array,
};

export default function CreditWallet({ walletId, walletList }) {
  const { themeStretch } = useSettings();
  const currentUser = walletList.find((wallet) => wallet?.id === walletId);

  return (
    <Page title="Credit Wallet">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Credit wallet'
          links={[
            { name: 'Dashboard', href: ROUTES.PATH_ADMIN.root },
            { name: 'Wallet', href: ROUTES.PATH_ADMIN.wallet.root },
            { name: capitalCase(currentUser?.name) },
          ]}
        />

        <CreditWalletForm currentUser={currentUser} />
      </Container>
    </Page>
  );
}
