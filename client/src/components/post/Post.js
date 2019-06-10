import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from '../post/CommentForm'
import CommentItem from '../post/CommentItem'
import {getPostById} from '../../redux/actions/post'


const Post = ({getPostById, post: {post,loading}, match}) => {
    
    useEffect( () => {
        getPostById(match.params.id)
    }, [getPostById])
    
    return loading || post === null ? (<Spinner />) : (<Fragment>
        <Link to="/posts" className="btn">Назад</Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id}/>
        <div className="comments">
            {post.comments.map(comment => (
                <CommentItem  key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
    </Fragment>)
}

Post.propTypes = {
    getPostById: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, {getPostById})(Post)
