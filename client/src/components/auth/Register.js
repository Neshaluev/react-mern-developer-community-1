import React, {Fragment, useState} from 'react'
import {Link, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {setAlert} from '../../redux/actions/alert';
import {register} from '../../redux/actions/auth';

const Register = ({setAlert, register, isAuthenticated, history}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name,email, password, password2} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2) {
      setAlert('Пароли не совпадают.', 'danger')
    } else{
      register({name, email, password, password2, history});
    }
  }
  if(isAuthenticated){
    return <Redirect to="/dashboard" />
  }
  return (
    <Fragment>
    <h1 className="large text-primary">Регистрация</h1>
    <p className="lead"><i className="fas fa-user"></i> Создайте аккаунт </p>
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <input 
          type="text"
           placeholder="Имя" 
           name="name"
           value={name}
           onChange={e => onChange(e)} 
            required
           />
      </div>
      <div className="form-group">
        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={e => onChange(e)}  
          name="email"
          required />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Пароль"
          name="password"
          value={password}
          onChange={e => onChange(e)} 
          minLength={6}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Повторите пароль"
          name="password2"
          minLength="6"
          required
          value={password2}
          onChange={e => onChange(e)} 
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Регистрация" />
    </form>
    <p className="my-1">
      Уже есть аккаунт? <Link to="/login">Вход</Link>
    </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default withRouter(connect(mapStateToProps, {setAlert, register})(Register));
