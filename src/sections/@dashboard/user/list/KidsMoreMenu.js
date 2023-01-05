import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { useSnackbar } from 'notistack';

// import * as ROUTES from '../../../../constants/routes'
// component
import Iconify from '../../../../components/Iconify';
import { setLoading, setRequestStatus } from '../../../../redux/actions/miscActions';

// ----------------------------------------------------------------------

export default function KidsMoreMenu() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { requestStatus, isLoading } = useSelector((state) => ({
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading
  }));

  useEffect(() => {
    dispatch(setLoading(false));
    dispatch(setRequestStatus(null));
    if (requestStatus?.message && !isLoading) {
      enqueueSnackbar(requestStatus.message, { variant: requestStatus.status })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestStatus, isLoading]);

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
