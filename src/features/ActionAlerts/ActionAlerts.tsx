import { useEffect } from 'react';

import { Alert, Stack } from '@mui/material';

import s from './ActionAlert.module.scss';

import { useAppDispatch, useAppSelector } from 'bll/hooks';
import { setAppError } from 'bll/slices/app-slice';

export const ActionAlerts = () => {
  const { error } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(setAppError(null));
    }, 4000);
    return () => clearTimeout(timerId);
  }, [error]);

  const onHideAlertHandler = () => dispatch(setAppError(null));

  const errorClassName = `${s.alert} ${error ? s.hidden : ''}`;

  return (
    <div className={errorClassName}>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error" onClose={onHideAlertHandler}>
          {error}
        </Alert>
      </Stack>
    </div>
  );
};
