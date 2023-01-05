import PropTypes from 'prop-types';
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
import CreateKidWalletForm from '../../../sections/@dashboard/user/CreateKidWalletForm';

// ----------------------------------------------------------------------

CreateChildWallet.propTypes = {
  parentId: PropTypes.string,
  parentList: PropTypes.array,
};

export default function CreateChildWallet({ parentId, parentList }) {
  const { themeStretch } = useSettings();
  const parentUser = parentList.find((parent) => parent?.id === parentId);

  return (
    <Page title="Create Child Wallet">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Create child wallet'
          links={[
            { name: 'Dashboard', href: ROUTES.PATH_ADMIN.root },
            { name: 'Wallet', href: ROUTES.PATH_ADMIN.wallet.root },
            { name: 'Create child wallet' },
          ]}
        />

        <CreateKidWalletForm parentUser={parentUser} />
      </Container>
    </Page>
  );
}
