import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Spinner from '../layout/Spinner'
import {getProfileById} from '../../redux/actions/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExpirence from './ProfileExpirence'
import ProfileEducation from './ProfileEducation'

const Profile = ({getProfileById, match, profile: {profile, loading}, auth }) => {
    useEffect( () => {
        getProfileById(match.params.id)
    }, [getProfileById] )
    console.log(profile)
    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : 
                <Fragment>
                    <Link to="/profiles" className='btn btn-light'>Назад</Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user.id === profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>
                        Редактировать профиль
                    </Link>) }
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile}/>
                        <ProfileAbout profile={profile}/>

                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Место работы</h2>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                    {profile.experience.map(experience => (
                                        <ProfileExpirence key={experience._id} experience={experience}/>
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>Опыт работы отсутствует</h4>
                                )}
                        </div>
                       
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Образование</h2>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                    {profile.education.map(education => (
                                        <ProfileEducation key={education._id} education={education}/>
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>Образование отсутствует</h4>
                                )}
                        </div>
                            

                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth 
})
export default connect(mapStateToProps, {getProfileById})(Profile)
