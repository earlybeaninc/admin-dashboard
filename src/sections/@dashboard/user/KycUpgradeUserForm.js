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
import { GENDER_OPTION } from '../../../constants/constants';

// _data
import { countries } from '../../../_data';
// components
import { 
  FormProvider, RHFRadioGroup, RHFSelect, 
  RHFTextField, RHFUploadAvatar 
} from '../../../components/hook-form';

import { UpgardeKycTeir1 } from '../../../redux/actions/userActions';
import { setRequestStatus } from '../../../redux/actions/miscActions';

// ----------------------------------------------------------------------

KycUpgradeUserForm.propTypes = {
  currentUser: PropTypes.any,
};

export default function KycUpgradeUserForm({ currentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const KycUpgradeSchema = Yup.object().shape({
    bvn: Yup.string()
      .required('BVN is required'),
    email: Yup.string()
      .nullable()
      .email(),
    placeOfBirth: Yup.string()
      .required('Place of birth is required'),
    address: Yup.string()
      .required('Address is required'),
    country: Yup.string()
      .required('country is required'),
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
      bvn: currentUser?.bvn || '',
      email: currentUser?.email || '',
      placeOfBirth: currentUser?.placeOfBirth || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      gender: currentUser?.gender || '',
      profileImage: currentUser?.profileImage || '',
      dob: currentUser?.dob || new Date(),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
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
      dispatch(UpgardeKycTeir1({
        place_of_birth: form.placeOfBirth.trim(),
        bvn: form.bvn.trim(),
        email: form.email.trim().toLowerCase(),
        address: form.address.trim(),
        dob: `${form.dob.getFullYear()}-${form.dob.getMonth() + 1}-${form.dob.getDate()}`,
        gender: form.gender.trim().toLowerCase(),
        country: form.country.trim(),
        image: getValues('profileImage'),
        user_id: currentUser.userId
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

              <RHFTextField name="address" label="Address" fullWidth multiline rows={2} />
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
