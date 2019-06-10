import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addComment} from '../../redux/actions/post'

const CommentForm = ({postId,addComment, user: {name , avatar}}) => {
    console.log('post',postId)
    const [text, setText] = useState('');
    const onChange = e => {
        e.preventDefault();
        addComment(postId,text, name, avatar);
        setText('')
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Добавить комментарий</h3>
            </div>
            <form className="form my-1" onSubmit={e =>onChange(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Введите текст"
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Отправить" />
            </form>    
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    user: state.auth.user
})
export default connect(mapStateToProps, {addComment})(CommentForm)
