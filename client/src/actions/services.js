import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_SERVICES,
  UPDATE_SERVICES,
  GET_ENROLLED,
  UPDATE_ENROLLED,
  CLEAR_ENROLLED,
} from './types';

// get all events
export const getServices = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/services/me');

    dispatch({
      type: GET_SERVICES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((el) => dispatch(setAlert(el.msg, 'danger')));
    }
  }
};

// for student viewing
export const getAllServices = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/services');

    dispatch({
      type: GET_SERVICES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((el) => dispatch(setAlert(el.msg, 'danger')));
    }
  }
};

// Create an event=update events object
export const updateServices = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/services', formData, config);

    dispatch({
      type: UPDATE_SERVICES,
      payload: res.data,
    });

    history.push('/services');
    dispatch(setAlert('Service created', 'success'));

    // dispatch({
    //   type: GET_SERVICES
    // });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((el) => dispatch(setAlert(el.msg, 'danger')));
    }
  }
};

// delete event
export const deleteService = (id) => async (dispatch) => {
  try {
    let res = window.confirm('Are you sure?');

    if (res) {
      await axios.delete(`/api/services/${id}`);
      const res = await axios.get('/api/services/me');

      dispatch({
        type: GET_SERVICES,
        payload: res.data,
      });

      dispatch(setAlert('Service deleted', 'success'));
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((el) => dispatch(setAlert(el.msg, 'danger')));
    }
  }
};

/////////////////// enrolled part

// Create an event=update events object
export const createEnrolled = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // console.log(formData);

    const res = await axios.post('/api/enrolled', formData, config);

    dispatch({
      type: UPDATE_ENROLLED,
      payload: res.data,
    });

    history.push('/student-dashboard');
    dispatch(setAlert('Enrollment is added to your applications', 'success'));

    dispatch({
      type: GET_ENROLLED,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((el) => dispatch(setAlert(el.msg, 'danger')));
    }
  }
};

// student view enrols by him
export const getEnrolled = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/enrolled/me');

    dispatch({
      type: GET_ENROLLED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((el) => dispatch(setAlert(el.msg, 'danger')));
    }
  }
};

// teacher view enrols by him
export const getEnrolledTeacher = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/enrolled/teacher/me');

    dispatch({
      type: GET_ENROLLED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((el) => dispatch(setAlert(el.msg, 'danger')));
    }
  }
};

// teacher approves enrollment, and and to his event list
export const getEnrolledApprove = (enroll_id) => async (dispatch) => {
  try {
    await axios.post(`/api/enrolled/${enroll_id}`);

    const res = await axios.get('/api/enrolled/teacher/me');
    dispatch({
      type: GET_ENROLLED,
      payload: res.data,
    });

    dispatch(
      setAlert('Enrollment approved, and added to your schedule', 'success')
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((el) => dispatch(setAlert(el.msg, 'danger')));
    }
  }
};

// teacher rejects enrollment, it will be deleted from db
export const getEnrolledReject = (enroll_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/enrolled/${enroll_id}`);

    const res = await axios.get('/api/enrolled/teacher/me');

    dispatch({
      type: GET_ENROLLED,
      payload: res.data,
    });

    dispatch(setAlert('Enrollment deleted', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((el) => dispatch(setAlert(el.msg, 'danger')));
    }
  }
};
