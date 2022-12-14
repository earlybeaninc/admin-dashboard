import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, FormLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFRadioGroup, RHFTextField } from '../../../components/hook-form';
// redux
import { setAuthenticating, setAuthStatus } from '../../../redux/actions/miscActions';
import { signUp } from '../../../redux/actions/authActions';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showpasswordConfirmation, setShowpasswordConfirmation] = useState(false);

  const { isAuthenticating, authStatus } = useSelector((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.app.authStatus
}));

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name required')
      .min(2, 'Name should be at least 2 characters.'),
    lastName: Yup.string()
      .required('Last name required')
      .min(2, 'Name should be at least 2 characters.'),
    email: Yup.string()
      .email('Email is not valid.')
      .required('Email is required.'),
    password: Yup.string()
      .required('Password is required.')
      .min(8, 'Password length should be at least 8 characters.')
      .matches(/[A-Z\W]/g, 'Password should contain at least 1 uppercase letter.'),
    passwordConfirmation: Yup.string()
      .required('Confirm password is required.')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
    gender: Yup.string()
      .required('Gender is required.'),
    dob: Yup.string()
      .required('Date of Birth is required.'),
    mobileNumber: Yup.string()
      .required('Mobile is required.')
      .min(11, 'Mobile number should be at least 14 characters.')
      .max(12, 'Mobile number should be only be 15 characters long.'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    mobileNumber: '',
    gender: ''
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { reset, handleSubmit  } = methods;
  const GENDER_OPTION = ['Male', 'Female'];

  useEffect(() => {
      dispatch(setAuthStatus(null));
      dispatch(setAuthenticating(false));
  }, [dispatch]);

  useEffect(() => {
      if (authStatus?.message && !isAuthenticating) {
        enqueueSnackbar(authStatus.message, { variant: authStatus.status })
      }
  }, [enqueueSnackbar, authStatus, isAuthenticating]);

  const onSubmit = (form) => {
    dispatch(signUp({
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password.trim(),
      password_confirmation: form.passwordConfirmation.trim(),
      gender: form.gender.trim().toLowerCase(),
      phone: form.mobileNumber.trim(),
      dob: form.dob.trim()
    }));
    reset();
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTextField name="firstName" label="First name" />
            <RHFTextField name="lastName" label="Last name" />
          </Stack>

          <RHFTextField name="email" label="Email address" />
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
          <RHFTextField name="mobileNumber" type="number" label="Mobile" />
          <div>
            <FormLabel id="gender-row-radio-buttons-group-label">Date of Birth</FormLabel>
            <RHFTextField type="date" name="dob" />
          </div>

          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="passwordConfirmation"
            label="Confirm Password"
            type={showpasswordConfirmation ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowpasswordConfirmation(!showpasswordConfirmation)}>
                    <Iconify icon={showpasswordConfirmation ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isAuthenticating}>
            Register
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
}
