import React from 'react';

import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';

import s from './MenuBar.module.scss';

import { useAppDispatch, useAppSelector } from 'bll/hooks';
import { setAppError } from 'bll/slices/app-slice';
import { findMovies, FindMoviesDataType } from 'bll/slices/movies-slice';

export const MenuBar = () => {
  const dispatch = useAppDispatch();

  const { status } = useAppSelector(state => state.app);

  const formik = useFormik({
    initialValues: {
      title: '',
      type: 'Movie',
    },
    validate: values => {
      const errors: Partial<FindMoviesDataType> = {};
      if (!values.title) dispatch(setAppError('Enter Title'));
      return errors;
    },
    onSubmit: values => {
      dispatch(findMovies({ findData: values, page: 1 }));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={s.barContainer}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '70%' }}>
        <MovieCreationOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          sx={{ width: '100%', margin: '0 10px' }}
          id="input-with-sx"
          label="Enter title..."
          variant="standard"
          {...formik.getFieldProps('title')}
          onBlur={() => {}}
        />
      </Box>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label"> </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={formik.values.type}
          onChange={formik.handleChange}
          label="type"
          name="type"
        >
          <MenuItem value="Movie">Movie</MenuItem>
          <MenuItem value="Series">Series</MenuItem>
          <MenuItem value="Episode">Episode</MenuItem>
        </Select>
      </FormControl>

      <LoadingButton
        size="large"
        loading={status === 'loading'}
        variant="contained"
        type="submit"
      >
        Find
      </LoadingButton>
    </form>
  );
};
