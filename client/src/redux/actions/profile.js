import axios from 'axios';
import {PROFILE_ERROR,PROFILE_GET, PROFILE_UPDATE, ACCOUNT_DELETE, PROFILE_CLEAR, PROFILE_GETS} from './types';
import {setAlert} from './alert';

export const getCurrentProfile = () => async dispatch => {
    dispatch({type: PROFILE_CLEAR,})
    try {
        const res = await axios.get(`/api/profile`);
        dispatch({
            type: PROFILE_GET,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}  

export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: PROFILE_GET,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
        // dispatch({
        //     type: PROFILE_ERROR,
        //     payload: {msg: error.response.statusText, status: error.response.status}
        // })
    }
}  

export const getAllProfiles = () => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/all`);
        dispatch({
            type: PROFILE_GETS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}  

export const createProfile = (formData, history, edit = false) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    } 
    try {
        const res = await axios.post(`/api/profile`, formData, config);
        dispatch({
            type: PROFILE_GET,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Профиль успешно редактирован' : 'Профиль успешно создан', 'success'))
        if(!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const error = err.response.data;         
        if(error) {
               for(let key in error){
                dispatch(setAlert(error[key], 'danger'))
            }
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}  

export const addExperience = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    } 
    try {
        const res = await axios.post(`/api/profile/experience`, formData, config);
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data
        })
        dispatch(setAlert('Expreriend Added', 'success'))
        history.push('/dashboard');
    } catch (err) {
        const error = err.response.data;         
        if(error) {
               for(let key in error){
                dispatch(setAlert(error[key], 'danger'))
            }
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
} 

export const addEducation = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    } 
    try {
        const res = await axios.post(`/api/profile/education`, formData, config);
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data
        })
        dispatch(setAlert('Образование добавленно успешно', 'success'))
        history.push('/dashboard');
    } catch (err) {
        const error = err.response.data;         
        if(error) {
               for(let key in error){
                dispatch(setAlert(error[key], 'danger'))
            }
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
} 

export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data
        })
        dispatch(setAlert('Место работы успешно удаленно', 'success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data
        })
        dispatch(setAlert('Образование успешно удаленно', 'success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Вы уверены что хотите удалить аккаунт?')){
        try {
            await axios.delete(`/api/profile`);
            dispatch({type: ACCOUNT_DELETE})
            dispatch(setAlert('Ваш аккаунт удален', 'success'))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            })
        }
    }
}

