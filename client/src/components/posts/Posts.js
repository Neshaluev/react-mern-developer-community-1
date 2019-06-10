import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'
import {getPost} from '../../redux/actions/post'

const Posts = ({getPost, post: {posts, loading} }) => {
    useEffect( () => {
        getPost()
    }, [getPost])
    return loading ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Темы</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Добро пожаловать в сообщество
        </p>
        <PostForm />
        <div className="posts">
            {posts.map(post => (
                <PostItem key={post._id} post={post} />
            ))}
        </div>
    </Fragment>
}

Posts.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPost})(Posts)
