import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

import * as ROUTES from '../../../../constants/routes'
// component
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------
UserMoreMenu.propTypes = {
  user: PropTypes.object
};

export default function UserMoreMenu({ user }) {
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
        {user.kycTier !== 2 && (
          <MenuItem sx={{ color: 'text.secondary' }}
            component={RouterLink} 
            to={`${ROUTES.PATH_ADMIN.users.root}/${user.id}/kyc-upgrade-1`}
          >
            <ListItemIcon>
              <Iconify icon="mdi:account-cog-outline" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="KYC Upgrade" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}