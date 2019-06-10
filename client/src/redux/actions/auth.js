import axios from 'axios';

import {setAlert} from './alert';
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_AUTH, AUTH_ERROR, LOAD_USER, LOGOUT, PROFILE_CLEAR} from './types'
import setAuthToken from '../../utils/setAuthToken';

export const logout = () => dispatch => {
    dispatch({type: LOGOUT})
    dispatch({type: PROFILE_CLEAR})
}

export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        console.log('Получение юзера')
        const res = await axios.get('/api/users/user');
        await dispatch({
            type: LOAD_USER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const login = ({history, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    } 
    const loadUser =  {
        email,
        password
    }
    try {
        const res = await axios.post('/api/users/login', loadUser, config);
        console.log(res)
        await dispatch({
            type: USER_AUTH,
            payload: res.data
        })
        history.push('/dashboard')
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const register = ({name, email, password, password2, history}) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }       
    const newUser = {
        name,
        email,
        password,
        password2
    }
    const body  = JSON.stringify(newUser);
    try {
        const res = await axios.post('/api/users/register', body, config);
        await dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        await dispatch(setAlert('Вы успешно зарегистрировались можете войти.', 'success'))
        history.push('/login')
    } catch (err) {
        const error = err.response.data;         
        if(error) {
            const error = err.response.data;
            for(let key in error){
                dispatch(setAlert(error[key], 'danger'))
            }
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
        
}
