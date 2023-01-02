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
import KycUpgradeUserForm2 from '../../../sections/@dashboard/user/KycUpgradeUserForm2';

// ----------------------------------------------------------------------

KycUpgrade2.propTypes = {
  parentId: PropTypes.string,
  parentList: PropTypes.array,
};

export default function KycUpgrade2({ parentId, parentList }) {
  const { themeStretch } = useSettings();
  const currentUser = parentList.find((parent) => parent?.id === parentId);

  return (
    <Page title="KYC Upgrade">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Upgrade user'
          links={[
            { name: 'Dashboard', href: ROUTES.PATH_ADMIN.root },
            { name: 'Parent List', href: ROUTES.PATH_ADMIN.users.parent },
            { name: capitalCase(currentUser?.name) },
          ]}
        />

        <KycUpgradeUserForm2 currentUser={currentUser} />
      </Container>
    </Page>
  );
}
