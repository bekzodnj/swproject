import axios from 'axios';
import { setAlert } from './alert';
import { GET_SCHEDULE, CREATE_SCHEDULE } from './types';

//
// Create schedule
export const createSchedule = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/schedule', formData, config);

    dispatch({
      type: createSchedule,
      payload: res.data,
    });

    dispatch(setAlert('Service created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((el) => dispatch(setAlert(el.msg, 'danger')));
    }
  }
};

// get Schedule by TeacherId
// this action will be used by Student
export const getTeacherSchedule = (teacher_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/schedule/${teacher_id}`);

    dispatch({
      type: GET_SCHEDULE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((el) => dispatch(setAlert(el.msg, 'danger')));
    }
  }
};
