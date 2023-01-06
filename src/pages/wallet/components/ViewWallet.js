import PropTypes from 'prop-types';
import { capitalCase } from 'change-case';
// @mui
import { Container, Box, Grid, Card, Button, Typography, Stack } from '@mui/material';
// routes
import * as ROUTES from '../../../constants/routes';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { WalletDetails } from '../../../sections/@dashboard/wallet/account';
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

ViewWallet.propTypes = {
  walletId: PropTypes.string,
  walletList: PropTypes.array,
};

export default function ViewWallet({ walletId, walletList }) {
  const { themeStretch } = useSettings();
  const currentUser = walletList.find((wallet) => wallet?.id === walletId);

  return (
    <Page title="Wallet Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Wallet Details'
          links={[
            { name: 'Dashboard', href: ROUTES.PATH_ADMIN.root },
            { name: 'Wallet', href: ROUTES.PATH_ADMIN.wallet.root },
            { name: capitalCase(currentUser?.name) },
          ]}
        />

        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
                  Account
                </Typography>
                <Typography variant="h4">{`${currentUser.currency} ${fCurrency(currentUser.balance)}`}</Typography>
                <Box
                  sx={{
                    mt: { xs: 2, sm: 0 },
                    position: { sm: 'absolute' },
                    top: { sm: 24 },
                    right: { sm: 24 },
                  }}
                >
                  <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                    {currentUser.acctType}
                  </Button>
                  <Button 
                    size="small" 
                    color={(!currentUser.status && 'error') || 'success'}
                    variant="outlined"
                    sx={{ mr: 1 }}>
                    {currentUser.status}
                  </Button>
                </Box>
              </Card>
              <WalletDetails currentUser={currentUser} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
