import {POST_GET, POST_GETS,POST_ERROR, POST_LIKE, POST_DELETE, POST_ADD, COMMENT_ADD, COMMENT_REMOVE} from '../actions/types'

const initialSate = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function(state = initialSate, {type,payload}){
    switch(type) {
        case POST_GETS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case POST_GET:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case POST_ADD:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case POST_LIKE:
            return {
                ...state,
                posts: state.posts.map( post => post._id === payload.id ? { ...post, likes: payload.likes.likes} : post )

            }
        case POST_DELETE:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case COMMENT_ADD: 
            return {
                ...state,
                post: {...state.post, comments: payload},
                loading: false
            }
        case COMMENT_REMOVE: 
            return {
                ...state,
                post: {...state.post, comments: state.post.comments.filter(comment => comment._id !== payload)},
                loading: false
            }
        default: return state;
    }
}