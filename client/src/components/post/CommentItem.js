import React, {Fragment} from 'react'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import {removeComment} from '../../redux/actions/post'

const CommentItem = ({postId, comment: {_id, text, name, avatar, user, date}, auth, removeComment}) => {
    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
                {text}
            </p>
             <p className="post-date">
              Добавлено <Moment format='YYYY/MM.DD'>{date}</Moment>
            </p>
            {!auth.loading && user === auth.user.id && (
                <button onClick={e => removeComment(postId, _id)} className="btn btn-danger">
                    <i className="fas fa-times"></i>
                </button>
            )}
          </div>
        </div>
    )
}

CommentItem.propTypes = {
    removeComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {removeComment})(CommentItem)
