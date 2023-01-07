import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton, MobileDatePicker } from '@mui/lab';
import { 
  Box, Card, FormLabel, Grid, Stack,
  TextField, Typography 
} from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import * as ROUTES from '../../../constants/routes';
import { GENDER_OPTION, WALLET_TYPE } from '../../../constants/constants';

// components
import { 
  FormProvider, RHFRadioGroup, 
  RHFTextField, RHFUploadAvatar 
} from '../../../components/hook-form';

import { CreateChildWallet } from '../../../redux/actions/userActions';
import { setRequestStatus } from '../../../redux/actions/miscActions';

// ----------------------------------------------------------------------

CreateKidWalletForm.propTypes = {
  parentUser: PropTypes.any,
};

export default function CreateKidWalletForm({ parentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const KycUpgradeSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
    email: Yup.string()
      .nullable()
      .email(),
    phone: Yup.string()
      .required('Mobile number is required'),
    walletType: Yup.mixed()
      .required('Wallet type is required')
      .oneOf(WALLET_TYPE),
    dob: Yup.date()
      .required('Date of Birth is required'),
    gender: Yup.mixed()
      .required('Gender is required')
      .oneOf(GENDER_OPTION),
    profileImage: Yup.mixed()
      .nullable(),
      // .test('required', 'Image is required', (value) => value !== ''),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      walletType: '',
      gender: '',
      profileImage: '',
      dob: new Date(),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(KycUpgradeSchema),
    defaultValues,
  });

  const {
    control,
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
      dispatch(CreateChildWallet({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        walletType: form.walletType.trim(),
        dob: `${form.dob.getFullYear()}-${form.dob.getMonth() + 1}-${form.dob.getDate()}`,
        gender: form.gender.trim(),
        currency: 'NGN',
        image: getValues('profileImage'),
        userId: parentUser.userId
      }));
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const img = acceptedFiles[0];
      const reader = new FileReader();

      if (img) {
        reader.addEventListener('load', (e) => {
          setValue('profileImage', e.target.result);
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
                name="profileImage"
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
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="phone" label="Mobile Number" />
              <div>
                <FormLabel id="gender-row-radio-buttons-group-label">Gender</FormLabel>
                <RHFRadioGroup
                  name="gender"
                  options={GENDER_OPTION}
                  sx={{
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
              </div>

              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <MobileDatePicker
                    {...field}
                    label="Date of Birth"
                    inputFormat="yyyy-MM-dd"
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                )}
              />

              <div>
                <FormLabel id="wallet-row-radio-buttons-group-label">Wallet Type</FormLabel>
                <RHFRadioGroup
                  name="walletType"
                  options={WALLET_TYPE}
                  sx={{
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
              </div>
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
