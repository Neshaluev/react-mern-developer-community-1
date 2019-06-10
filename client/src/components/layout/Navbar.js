import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import  {  Link } from 'react-router-dom';
import  PropTypes from 'prop-types';

import  {logout} from '../../redux/actions/auth';


export const  Navbar = ({ auth: {isAuthenticated, loading}, logout }) => {
  const authLinks = (
    <ul>
    <li>
      <Link exact to="/posts">
        <span className="">Темы</span>
      </Link>
    </li>
    <li>
      <Link exact to="/dashboard">
        <span className="">Профиль</span>
      </Link>
    </li>
    <li>
      <Link exact to="/profiles">
        <span className="">Разрабочики</span>
      </Link>
    </li>
      <li>
        <a onClick={logout} href="/">
        <span className="">Выход</span></a>
      </li>
    </ul>
  )
  const questLinks = (
    <ul>
      <li><Link exact to="/">Главная</Link></li>
      <li><Link exact to="/register">Регистрация</Link></li>
      <li><Link exact to="/login">Логин</Link></li>
    </ul>
  )

  return (
    <nav className="navbar bg-dark">
    <h1>
      <Link to="/">React MERN Stack</Link>
    </h1>
    {!loading && (<Fragment>{isAuthenticated ? authLinks : questLinks}</Fragment>) }
  </nav>
  );
}


Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout} )(Navbar);
