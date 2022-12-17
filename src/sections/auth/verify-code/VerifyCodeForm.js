import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { OutlinedInput, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { verifyEmailCode } from '../../../redux/actions/authActions';

// routes

// ----------------------------------------------------------------------

export default function VerifyCodeForm() {
  const { authUser, isAuthenticating, authStatus } = useSelector((state) => ({
      authUser: state.auth,
      isAuthenticating: state.app.isAuthenticating,
      authStatus: state.app.authStatus
  }));

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
    code6: Yup.string().required('Code is required'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const values = watch();

  useEffect(() => {
    document.addEventListener('paste', handlePasteClipboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
      if (authStatus?.message && !isAuthenticating) {
        enqueueSnackbar(authStatus.message, { variant: authStatus.status })
      }
  }, [enqueueSnackbar, authStatus, isAuthenticating]);

  const onSubmit = (data) => {
    const token = Object.values(data).join('')
    console.log('code:', token);
    dispatch(verifyEmailCode(authUser.email, token));
    reset();
  };

  const handlePasteClipboard = (event) => {
    let data = event?.clipboardData?.getData('Text') || '';

    data = data.split('');

    [].forEach.call(document.querySelectorAll('#field-code'), (node, index) => {
      node.value = data[index];
      const fieldIndex = `code${index + 1}`;
      setValue(fieldIndex, data[index]);
    });
  };

  const handleChangeWithNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;
    const fieldIndex = name.replace('code', '');

    const fieldIntIndex = Number(fieldIndex);

    if (value.length >= maxLength) {
      if (fieldIntIndex < 6) {
        const nextfield = document.querySelector(`input[name=code${fieldIntIndex + 1}]`);

        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }

    handleChange(event);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2} justifyContent="center">
        {Object.keys(values).map((name, index) => (
          <Controller
            key={name}
            name={`code${index + 1}`}
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                id="field-code"
                autoFocus={index === 0}
                placeholder="-"
                onChange={(event) => handleChangeWithNextField(event, field.onChange)}
                inputProps={{
                  maxLength: 1,
                  sx: {
                    p: 0,
                    textAlign: 'center',
                    width: { xs: 36, sm: 56 },
                    height: { xs: 36, sm: 56 },
                  },
                }}
              />
            )}
          />
        ))}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        disabled={isAuthenticating}
        sx={{ mt: 3 }}
      >
        Verify
      </LoadingButton>
    </form>
  );
}
