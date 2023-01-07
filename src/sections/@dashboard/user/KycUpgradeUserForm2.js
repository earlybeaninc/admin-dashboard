import { useCallback, useEffect, useMemo } from 'react';
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
  Box, Card, Grid, Stack,
  Typography 
} from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import * as ROUTES from '../../../constants/routes';

// components
import { 
  FormProvider, RHFTextField, RHFUploadAvatar 
} from '../../../components/hook-form';

import { UpgardeKycTeir2 } from '../../../redux/actions/userActions';
import { setRequestStatus } from '../../../redux/actions/miscActions';

// ----------------------------------------------------------------------

KycUpgradeUserForm2.propTypes = {
  currentUser: PropTypes.any,
};

export default function KycUpgradeUserForm2({ currentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const KycUpgradeSchema = Yup.object().shape({
    meansOfId: Yup.string()
      .required('Means of Identification is required'),
    email: Yup.string()
      .nullable()
      .email(),
    idImage: Yup.mixed()
      .nullable(),
      // .test('required', 'Image is required', (value) => value !== ''),
  });

  const defaultValues = useMemo(
    () => ({
      meansOfId: currentUser?.means_of_id || '',
      email: currentUser?.email || '',
      idImage: currentUser?.idImage || ''
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(KycUpgradeSchema),
    defaultValues,
  });

  const {
    getValues,
    setValue,
    handleSubmit,
  } = methods;

  const { requestStatus, isLoading } = useSelector((state) => ({
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading
  }));

  useEffect(() => {
    dispatch(setRequestStatus(null));
    if (requestStatus?.message && !isLoading) {
      enqueueSnackbar(requestStatus.message, { variant: requestStatus.status })
      if (!requestStatus?.isError) {
        navigate(ROUTES.PATH_ADMIN.users.parent);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestStatus, isLoading]);

  const onSubmit = (form) => {
      dispatch(UpgardeKycTeir2({
        means_of_id: form.meansOfId.trim(),
        email: form.email.trim().toLowerCase(),
        image: getValues('idImage'),
        user_id: currentUser.userId
      }));
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const img = acceptedFiles[0];
      const reader = new FileReader();

      if (img) {
        reader.addEventListener('load', (e) => {
          setValue('idImage', e.target.result);
        });
        reader.readAsDataURL(img);
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="idImage"
                accept="image/x-png,image/jpeg"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

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
              <RHFTextField name="meansOfId" label="Means of Identification" />
              <RHFTextField name="email" label="Email Address" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isLoading}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
