import React, {Fragment, useState} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../redux/actions/auth';


const Login = ({history, login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: 'test@test.com',
        password: '123456'
    })

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault()

        if(email !== '' && password !== '') {
            console.log(email, password);
            login({history, email, password})
        }
    }
    if(isAuthenticated){
        return <Redirect to="/dashboard" />
      }
    return (
    <Fragment>
        <h1 className="large text-primary">Вход в систему</h1>
        <p className="lead"><i className="fas fa-user"></i> Войдити в аккаунт</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
            <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={email}
                onChange={e => onChange(e)}
            />
            </div>
            <div className="form-group">
            <input
                type="password"
                placeholder="Пароль"
                name="password"
                required
                value={password}
                onChange={e => onChange(e)}
            />
            </div>
            <input type="submit" className="btn btn-primary" value="Вход" />
        </form>
        <p className="my-1">
        У вас нет аккаунта?<Link to="/register"> Регистрация</Link>
        </p>
    </Fragment>
    )
}


Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  }
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
export default withRouter(connect(mapStateToProps, {login} )(Login))
