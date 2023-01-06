import PropTypes from 'prop-types';
// @mui
import { Box, Card, Button, Typography, Stack, Paper } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

WalletDetails.propTypes = {
  currentUser: PropTypes.object,
};

export default function WalletDetails({ currentUser }) {
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3} alignItems="flex-start">
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          Wallet Details
        </Typography>
        <Paper
          key={currentUser.id}
          sx={{
            p: 3,
            width: 1,
            bgcolor: 'background.neutral',
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            {currentUser.name}
          </Typography>

          <Typography variant="body2" gutterBottom>
            <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
              Bank Name: &nbsp;
            </Typography>
              {currentUser.bankName}
          </Typography>
          
          <Typography variant="body2" gutterBottom>
            <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
              Account No.: &nbsp;
            </Typography>
              {currentUser.acctNo}
          </Typography>

          <Typography variant="body2" gutterBottom>
            <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
              User: &nbsp;
            </Typography>
            {currentUser.parentId}
          </Typography>

          <Box sx={{ mt: 1 }}>
            <Button
              size="small"
              startIcon={<Iconify icon={'mdi:wallet-plus-outline'} />}
              sx={{ mr: 1 }}
            >
              {currentUser.walletType}
            </Button>
          </Box>
        </Paper>
      </Stack>
    </Card>
  );
}
