import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import * as ROUTES from '../../../constants/routes';
// _dtat
import { countries } from '../../../_data';
// components
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

// ----------------------------------------------------------------------

KycUpgradeUserForm.propTypes = {
  currentUser: PropTypes.any,
};

export default function KycUpgradeUserForm({ currentUser }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const KycUpgradeSchema = Yup.object().shape({
    bvn: Yup.string().required('BVN is required'),
    email: Yup.string().email(),
    placeOfBirth: Yup.string().required('Place of birthx is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('country is required'),
    dob: Yup.string().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    profileImage: Yup.mixed().test('required', 'Image is required', (value) => value !== ''),
  });

  const defaultValues = useMemo(
    () => ({
      bvn: currentUser?.bvn || '',
      email: currentUser?.email || '',
      placeOfBirth: currentUser?.placeOfBirth || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      gender: currentUser?.gender || '',
      profileImage: currentUser?.profileImage || '',
      dob: currentUser?.dob || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(KycUpgradeSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentUser) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Update success!');
      navigate(ROUTES.PATH_ADMIN.users.parent);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'profileImage',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
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
                name="profileImage"
                accept="image/*"
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
                    Allowed *.jpeg, *.jpg, *.png, *.gif
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
              <RHFTextField name="bvn" label="Bank Verification Number" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="placeOfBirth" label="Place of Birth" />

              <RHFSelect name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="gender" label="Gender" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="dob" label="Date of Birth" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
