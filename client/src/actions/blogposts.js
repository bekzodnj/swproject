import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, UPDATE_POST, CLEAR_POSTS } from './types';

// get all posts by creator (by me)
export const getMyPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/blogpost/me');

    dispatch({
      type: GET_POSTS,
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
export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/blogpost');

    dispatch({
      type: GET_POSTS,
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
export const createPost = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/blogpost', formData, config);

    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });

    history.push('/posts');
    dispatch(setAlert('Post created', 'success'));

    // dispatch({
    //   type: GET_POSTS,
    // });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((el) => dispatch(setAlert(el.msg, 'danger')));
    }
  }
};

// delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    let res = window.confirm('Are you sure?');

    if (res) {
      await axios.delete(`/api/blogpost/${id}`);

      const res = await axios.get('/api/services/me');

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });

      dispatch(setAlert('Post deleted', 'success'));
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((el) => dispatch(setAlert(el.msg, 'danger')));
    }
  }
};
