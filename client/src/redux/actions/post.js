import axios from 'axios'
import {setAlert} from './alert'
import {POST_GET,POST_GETS, POST_ERROR, POST_LIKE, POST_DELETE, POST_ADD, COMMENT_ADD, COMMENT_REMOVE} from '../actions/types'

export const getPost = () => async dispatch => {
    try {
        const res = await axios.get(`/api/posts`);
        dispatch({
            type: POST_GETS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}
export const getPostById = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: POST_GET,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const addLike = id => async dispatch => {
    try {
        const res = await axios.post(`/api/posts/like/${id}`);
        dispatch({
            type: POST_LIKE,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        console.log(err)
        // dispatch({
        //     type: POST_ERROR,
        //     payload: {msg: err.response.statusText, status: err.response.status}
        // })
    }
}

export const removeLike = id => async dispatch => {
    try {
        const res = await axios.post(`/api/posts/unlike/${id}`);
        dispatch({
            type: POST_LIKE,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        // dispatch({
        //     type: POST_ERROR,
        //     payload: {msg: err.response.statusText, status: err.response.status}
        // })
    }
}

export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`);
        dispatch({
            type: POST_DELETE,
            payload: id
        })
        dispatch(setAlert('Сообщение удаленно', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        dispatch(setAlert('Ошибка удаленния', 'danger'))
    }
}

export const addPost = ({text,name,avatar}) => async dispatch => {
    const formData = {
        text,
        name,
        avatar
    }
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        } 
        const res = await axios.post(`/api/posts`, formData, config);
        dispatch({
            type: POST_ADD,
            payload: res.data
        })
        dispatch(setAlert('Сообщение добавленно', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        dispatch(setAlert(err.response.data.text, 'danger'))
    }
}

export const addComment = (postId, text, name, avatar) => async dispatch => {
    const formData = {
        text,
        name,
        avatar
    }
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    } 
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
        dispatch({
            type: COMMENT_ADD,
            payload: res.data.comments
        })
        dispatch(setAlert('Комментарий добавлен', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const removeComment = (postId,commnetId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commnetId}`);
        dispatch({
            type: COMMENT_REMOVE,
            payload: commnetId
        })
        dispatch(setAlert('Комментарий удален', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}