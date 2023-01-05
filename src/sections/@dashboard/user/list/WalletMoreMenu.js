import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

import * as ROUTES from '../../../../constants/routes'
// component
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------
WalletMoreMenu.propTypes = {
  walletId: PropTypes.string
};

export default function WalletMoreMenu({ walletId }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.primary' }}
          component={RouterLink} 
          to={`${ROUTES.PATH_ADMIN.wallet.root}/${walletId}/credit`}
        >
          <ListItemIcon>
            <Iconify icon="mdi:wallet-plus-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Credit Wallet" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
