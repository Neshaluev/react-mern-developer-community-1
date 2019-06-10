import React, {useEffect, Fragment} from 'react'
import {connect} from 'react-redux'; 
import {Link} from 'react-router-dom'; 
import PropTypes from 'prop-types'; 
import {getCurrentProfile, deleteAccount} from '../../redux/actions/profile'; 
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { loadUser } from '../../redux/actions/auth';

const Dashboard = ({ getCurrentProfile, auth: {user}, profile: {profile,loading}, loadUser, deleteAccount }) => {
    useEffect(() => {
        loadUser()
        getCurrentProfile();  
    }, [])

    return loading && profile === null ? <Spinner /> : <Fragment> 
        <h1 className="large text-primary">Профиль</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Добро пожаловать {user && user.name}
        </p>
        {profile !== null ? (
            <Fragment>
                <DashboardActions />
                <Experience experience={profile.experience}/>
                <Education education={profile.education}/>

                <div className="my-2" onClick={() => deleteAccount()}>
                    <button className="btn btn-danger" >
                        Удалить аккаунт
                    </button>
                </div>
            </Fragment>
            ) : (
            <Fragment>
                <p>У вас отсутствует информация в профиле.</p>
                <Link to="/create-profile"  className="btn btn-primary"> Создать профиль</Link> 
            </Fragment>)
        }
    </Fragment>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, loadUser, deleteAccount })(Dashboard)
