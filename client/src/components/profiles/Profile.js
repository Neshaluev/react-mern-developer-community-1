import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import {getAllProfiles} from '../../redux/actions/profile'

const Profile = ({getAllProfiles, profile: {profiles, loading} }) => {

    useEffect( () => {
        getAllProfiles();
    }, [getAllProfiles]);


    return (
        <Fragment>
            { loading ? <Spinner /> : <Fragment> 
                <h1 className="large text-primary">Разрабочики</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Просмотрите и свяжитесь с разработчиками
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile} />
                        ))
                    ) : (
                        <h4>Профиль не найден ...</h4>
                        )   
                    }
                </div>
            </Fragment>}
        </Fragment>
    )
}

Profile.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, {getAllProfiles})(Profile)
