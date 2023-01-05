import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { 
  Box, Card, Grid, Stack
} from '@mui/material';
// routes
import * as ROUTES from '../../../constants/routes';

// components
import { 
  FormProvider, RHFTextField 
} from '../../../components/hook-form';

import { CreditWallet } from '../../../redux/actions/userActions';
import { setLoading, setRequestStatus } from '../../../redux/actions/miscActions';

// ----------------------------------------------------------------------

CreditWalletForm.propTypes = {
  currentUser: PropTypes.any,
};

export default function CreditWalletForm({ currentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const CreditWalletSchema = Yup.object().shape({
    amount: Yup.string()
      .required('Amount is required'),
    narration: Yup.string()
      .required('Narration is required')
  });

  const defaultValues = useMemo(
    () => ({
      amount: '',
      narration: ''
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(CreditWalletSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const { requestStatus, isLoading } = useSelector((state) => ({
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading
  }));

  useEffect(() => {
    dispatch(setLoading(false));
    dispatch(setRequestStatus(null));
    if (requestStatus?.message && !isLoading) {
      enqueueSnackbar(requestStatus.message, { variant: requestStatus.status })
      if (!requestStatus?.isError) {
        navigate(ROUTES.PATH_ADMIN.wallet.root);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestStatus, isLoading]);

  const onSubmit = (form) => {
      dispatch(CreditWallet({
        amount: form.amount.trim(),
        narration: form.narration.trim(),
        walletId: currentUser.id
      }));
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="amount" label="Amount" />
              <RHFTextField name="narration" label="Narration" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isLoading}>
                Credit Wallet
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
