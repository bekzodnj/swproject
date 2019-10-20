import axios from 'axios';
import { setAlert } from './alert';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

export const register = ({name, email, password}) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password});

    try {
        const res = await axios.post('api/users', config, body);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {

        const errors = err.response.data.erorrs;

        if(errors){
            erorrs.forEach(el => dispatch(setAlert(el.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}
