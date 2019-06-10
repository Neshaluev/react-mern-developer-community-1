import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {addPost} from '../../redux/actions/post'

const PostForm = ({addPost, user: {name, avatar} }) => {
    const [text, setText] = useState('');
    const onChange = e => {
        e.preventDefault();
        addPost({text,name,avatar});
        setText('')
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Добавить сообщение</h3>
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

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    user: state.auth.user
})
export default connect(mapStateToProps, {addPost})(PostForm)
