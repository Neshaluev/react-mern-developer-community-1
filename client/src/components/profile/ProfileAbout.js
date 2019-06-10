import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({
    profile: {
        bio,
        skills,
        user: {name}
    }
}) => {
    const skillsArr =  skills.trim().split(',');
    return (
        <Fragment>
        <div className="profile-about bg-light p-2">
            {bio && (
                <Fragment>
                    <h2 className="text-primary">{name}</h2>
                    <p>
                        {bio}
                    </p>
                    <div className="line"></div>
                </Fragment>
            )}

            <h2 className="text-primary">Навыки</h2>
            <div className="skills">
                {skillsArr.map((skill,index) => (
                    <div key={index} className="p-1"><i className="fa fa-check"></i> {skill}</div>
                ))}
                
            </div>
        </div>
        </Fragment>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileAbout
